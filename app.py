from flask import Flask, render_template, request, redirect, url_for, session
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

@app.route('/')
def index():
    email = session.get('user_email')
    return render_template('index.html', email=email)

# Para um user logar
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email'].strip()
        senha = request.form['senha'].strip()

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
            return redirect(url_for('index'))
        else:
            return render_template('login.html', erro="Usuário não encontrado ou senha incorreta.")
    
    email = session.get('user_email')
    return render_template('login.html', email=email)

# register de um novo user
@app.route('/register', methods=['POST'])
def register():
    email = request.form['email'].strip()
    senha = request.form['senha'].strip()

    if not email or not senha:
        return render_template('login.html', erro="Por favor, insira um email e senha válidos.")

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('INSERT INTO usuarios (email, senha) VALUES (%s, %s)', (email, senha))

    conn.commit()
    cursor.close()
    conn.close()

    # qnd dar register, vai p pagina principal NeetFinance
    session['user_email'] = email
    session['user_id'] = cursor.lastrowid
    return redirect(url_for('index'))

# essa rota criei p usuario fzr o exercicio e salvar nos seus dados
@app.route('/completar_exercicio', methods=['POST'])
def completar_exercicio():
    if 'user_id' in session:
        usuario_id = session['user_id'] # id do user logado
        exercicio_id = request.form['exercicio_id']

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('INSERT INTO usuarios_exercicios (usuario_id, exercicio_id, completado) VALUES (%s, %s, TRUE)',
                       (usuario_id, exercicio_id))
    
        conn.commit()
        cursor.close()
        conn.close()

        return redirect(url_for('exercicios'))
    else:
        return redirect(url_for('login'))

@app.route('/exercicios')
def exercicios():
    return render_template('exercicios.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('user_email', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)