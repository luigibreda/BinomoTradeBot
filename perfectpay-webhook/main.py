import os
import requests
from flask import Flask, request

app = Flask(__name__)

API_URL = 'https://binomotradebot-production.up.railway.app/api/auth/register'

@app.route('/', methods=['POST'])
def webhook():
    json_data = request.json
    customer_email = json_data['customer']['email']
    print(f'Email do cliente: {customer_email}')
    
    # Cria o payload com os dados do usuário
    username = customer_email.split('@')[0]  # Usa o email do cliente como nome de usuário
    password = 'Senha123Padrao'  # Define uma senha padrão
    payload = {
        'username': username,
        'password': password,
        'plan': '2',
        'expiresIn': 30
    }
    
    # Envia a requisição POST para criar o usuário
    response = requests.post(API_URL, json=payload)
    if response.status_code == 201:
        print(f'Usuário criado com sucesso: {username}')
    else:
        print(f'Erro ao criar usuário: {response.content}')
    
    return 'Webhook recebido com sucesso!'

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 80))
    app.run(host='0.0.0.0', port=port)
