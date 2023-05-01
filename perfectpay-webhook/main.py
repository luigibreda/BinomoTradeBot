import requests
from flask import Flask, request
import logging

logging.getLogger('werkzeug').disabled = True
app = Flask(__name__)

API_URL = 'https://binomotradebot-production.up.railway.app/api/auth/register'

# Configura o logger
logging.basicConfig(
    format='%(asctime)s [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    level=logging.INFO,
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('app.log')
    ]
)

@app.route('/', methods=['POST'])
def webhook():
    json_data = request.json
    customer_email = json_data['customer']['email']
    logging.info(f'Webhook recebido para o email {customer_email}')
    
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
        logging.info(f'Usuário criado com sucesso para o email: {customer_email} - Login: {username} e Senha: {password}')
    else:
        logging.error(f'Erro ao criar usuário para o email {customer_email}')
    
    return 'Webhook recebido com sucesso! {customer_email}'


app.run(host='perfectpay-webhook-production.up.railway.app', port=80, debug=True, threaded=True)
 