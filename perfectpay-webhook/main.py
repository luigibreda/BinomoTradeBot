import requests
from flask import Flask, request
import logging
import os

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

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
def handle_post():
    if request.method == 'POST':

        json_data = request.json
        customer_email = json_data['customer']['email']
        print('Received a POST request!')
        print(customer_email)
        return customer_email

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 80))
    app.run(host='0.0.0.0', port=port)