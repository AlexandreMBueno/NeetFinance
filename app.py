from flask import Flask, jsonify, request, session
from dotenv import load_dotenv
import os
import psycopg2

load_dotenv()

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_aqui'  # chave p usar sessoes

def get_db_connection():
    conn = psycopg2.connect(
        dbname=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        host=os.getenv('DB_HOST'),
        port=os.getenv('DB_PORT')
    )
    return conn

# API para verificar status de login
@app.route('/api/status')
def status():
    if 'user_id' in session:
        return jsonify({'status': 'logged_in', 'email': session.get('user_email')})
    return jsonify({'status': 'logged_out'})

# API para login
@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email').strip()
    senha = request.json.get('senha').strip()

    conn = get_db_connection()
    cursor = conn.cursor()

    # verifica se user existe no banco
    cursor.execute('SELECT id FROM usuarios WHERE email = %s AND senha = %s', (email, senha))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user:
        session['user_id'] = user[0]
        session['user_email'] = email  # armazena email do user na sessão
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'error', 'message': 'Usuário não encontrado ou senha incorreta.'})

# API para registrar novo usuário
@app.route('/api/register', methods=['POST'])
def register():
    email = request.json.get('email').strip()
    senha = request.json.get('senha').strip()

    if not email or not senha:
        return jsonify({'status': 'error', 'message': 'Por favor, insira um email e senha válidos.'})

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('INSERT INTO usuarios (email, senha) VALUES (%s, %s)', (email, senha))

    conn.commit()
    cursor.close()
    conn.close()

    # Após o registro, o usuário é automaticamente logado
    session['user_email'] = email
    session['user_id'] = cursor.lastrowid
    return jsonify({'status': 'success'})

# API para completar exercício
@app.route('/api/completar_exercicio', methods=['POST'])
def completar_exercicio():
    if 'user_id' in session:
        usuario_id = session['user_id']  # id do user logado
        exercicio_id = request.json.get('exercicio_id')

        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute('INSERT INTO usuarios_exercicios (usuario_id, exercicio_id, completado) VALUES (%s, %s, TRUE)',
                           (usuario_id, exercicio_id))
            conn.commit()
            response = {'status': 'success'}
        except Exception as e:
            conn.rollback()
            response = {'status': 'error', 'message': str(e)}
        finally:
            cursor.close()
            conn.close()

        return jsonify(response)
    else:
        return jsonify({'status': 'error', 'message': 'Usuário não autenticado'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('user_email', None)
    return jsonify({'status': 'logged_out'})

if __name__ == '__main__':
    app.run(debug=True)
