import requests
from flask import Flask, request
import logging
import os

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.application import MIMEApplication

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

@app.route('/', methods=['GET', 'POST'])
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

        # Configurações do servidor SMTP
        smtp_server = 'smtp.hostinger.com'
        smtp_port = 587
        smtp_username = 'robo@cashalien.com.br'
        smtp_password = 'jsp9714Asda#'

        # Configurações de e-mail
        sender_email = 'robo@cashalien.com.br'
        receiver_email = customer_email
        email_subject = 'Bem-vindo ao CashAlien!'
        email_greeting = 'Olá,'
        email_message = 'Obrigado por comprar nosso robô de negociação. Aqui estão as informações de login para começar:\n\nLogin: {username}\nSenha: {password}\n\nPara usar o robô, você também precisa baixar nossa extensão. Clique no botão abaixo para baixar:\n\nhttps://www.mediafire.com/file/tm6npjgyea8wwz6/cliente-extensao.zip/file\n\nApós o download, assista a este vídeo para aprender a instalar a extensão: https://youtu.be/Mk60W-_M8hk. \n\nEm breve, nossa extensão estará disponível na loja de extensões do navegador, facilitando ainda mais a instalação. Fique atento!\n\nObrigado novamente por sua compra e bons negócios!'.format(username=username, password=password)

        # Cria o objeto MIMEMultipart para o e-mail
        message = MIMEMultipart('related')

        # Cria uma mensagem de texto para a saudação personalizada e as informações de login do usuário
        email_greeting = email_greeting.format(nome='Nome do usuário')
        email_text = MIMEText(email_greeting + '\n\n' + email_message)
        message.attach(email_text)

        # # Carrega o arquivo "cliente.zip" e adiciona-o ao corpo do e-mail
        # with open('cliente.zip', 'rb') as f:
        #     attachment = MIMEApplication(f.read(), _subtype='zip')
        #     attachment.add_header('content-disposition', 'attachment', filename='cliente.zip')
        #     message.attach(attachment)

        # Cria uma tabela HTML com as informações de login do usuário e adiciona-a ao corpo do e-mail
        login_table = """
            <div style="box-shadow: 0px 0px 10px #cccccc; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                <img src="https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/plan/PPPB4GB0/pplqqbpreimageheaderpathcheckout_1200x300.jpg" style="display: block; margin: auto; max-width: 100%; height: auto;">
                <h2 style="font-size: 24px; font-weight: bold; margin-top: 30px; margin-bottom: 20px; text-align: center;">Suas informações de login:</h2>
                <table align="center" cellpadding="5" cellspacing="0" style="font-size: 18px; text-align: center; margin: auto; width: 100%; max-width: 600px;">
                    <tr>
                        <td style="padding: 10px;"><b>Nome de usuário:</b></td>
                        <td style="padding: 10px;">{username}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;"><b>Senha:</b></td>
                        <td style="padding: 10px;">{password}</td>
                    </tr>
                </table>
            </div>
        """.format(username=username, password=password)
        email_html = MIMEText(login_table, 'html')
        message.attach(email_html)

        message['From'] = sender_email
        message['To'] = receiver_email
        message['Subject'] = email_subject
        # message.add_header('Content-Type', 'text/html')

        try:
            # Envia o e-mail usando o servidor SMTP
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()
                server.login(smtp_username, smtp_password)
                server.sendmail(sender_email, receiver_email, message.as_string())
            logging.info(f'Email enviado com sucesso: {customer_email}')
            # return "Email enviado com sucesso"
        except Exception as e:
            logging.error(f'Erro ao enviar o email: {customer_email}')
            # return 'Erro ao criar usuário para o email.'
    else:
        logging.error(f'Erro ao criar usuário para o email {customer_email}')
        # return 'Erro ao criar usuário para o email.'
    return "Webhook chamado com sucesso."

# app.run(host='0.0.0.0', port=5000, debug=True, threaded=False)

port = int(os.environ.get('PORT', 80))
app.run(host='0.0.0.0', port=port)