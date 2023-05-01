import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

# Configurações do servidor SMTP
smtp_server = 'smtp.hostinger.com'
smtp_port = 587
smtp_username = 'robo@cashalien.com.br'
smtp_password = 'jsp9714Asda#'

# Configurações de e-mail
sender_email = 'robo@cashalien.com.br'
receiver_email = 'robo@cashalien.com.br'
email_subject = 'Bem-vindo ao CashAlien!'
email_greeting = 'Olá,'
email_message = 'Obrigado por comprar nosso robô de negociação. Aqui estão as informações de login para começar:'

# Configurações de login do usuário
login_username = 'seu_nome_de_usuario2'
login_password = 'sua_senha'

# Cria o objeto MIMEMultipart para o e-mail
message = MIMEMultipart('related')

# Carrega a imagem do banner e adiciona-a ao corpo do e-mail
with open('banner.jpg', 'rb') as f:
    banner_data = f.read()
    banner_image = MIMEImage(banner_data)
    banner_image.add_header('Content-ID', '<banner>')
    message.attach(banner_image)

# Cria uma mensagem de texto para a saudação personalizada e as informações de login do usuário
email_greeting = email_greeting.format(nome='Nome do usuário')
email_text = MIMEText(email_greeting + '\n\n' + email_message)
message.attach(email_text)

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
"""
login_table = login_table.format(username=login_username, password=login_password)
email_html = MIMEText(login_table, 'html')
message.attach(email_html)

message['From'] = sender_email
message['To'] = receiver_email
message['Subject'] = email_subject

# Envia o e-mail usando o servidor SMTP
with smtplib.SMTP(smtp_server, smtp_port) as server:
    server.starttls()
    server.login(smtp_username, smtp_password)
    server.sendmail(sender_email, receiver_email, message.as_string())

