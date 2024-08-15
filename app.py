from flask import Flask, render_template, request, redirect, url_for, session
import psycopg2

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_aqui'  # Chave secreta necessaria para usar sessoes

# nossa config p conectar ao banco
def get_db_connection():
    conn = psycopg2.connect(
        dbname='nf_database',
        user='postgres',
        password='nf5432',
        host='localhost'
    )
    return conn

@app.route('/')
def index():
    return render_template('index.html')


# para um user logar
@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']

        conn = get_db_connection()
        cursor = conn.cursor()

        # Verifica se o usuario existe no banco de dados
        cursor.execute('SELECT id FROM usuarios WHERE email = %s AND senha = %s', (email, senha))
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if user:
            # Salva o ID do usuario na sessao
            session['user_id'] = user[0]
            return redirect(url_for('index'))
        else:
            # Se o login falhar, redireciona para a pagina de login com uma mensagem de erro
            return render_template('login.html', erro="Usuario nao encontrado ou senha incorreta.")
    
    return render_template('login.html')

# para um user novo se registrar
@app.route('/register', methods=['POST'])
def register():
    email = request.form['email']
    senha = request.form['senha']

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('INSERT INTO usuarios (email, senha) VALUES (%s, %s)', (email, senha))

    conn.commit()
    cursor.close()
    conn.close()

    return redirect(url_for('login'))


# rota p usuario completar o ex e ficar salvo nos seus dados
@app.route('/completar_exercicio', methods=['POST'])
def completar_exercicio():
    if 'user_id' in session:
        usuario_id = session['user_id']  # pegamos o id do usuario q ta logado
        exercicio_id = request.form['exercicio_id']

        conn = get_db_connection()
        cursor = conn.cursor()

        # Adicionando um log para verificar os valores que estao sendo enviados
        print(f"Salvando progresso: usuario_id={usuario_id}, exercicio_id={exercicio_id}")

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
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
