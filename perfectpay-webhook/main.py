import requests
from flask import Flask, request
import logging
import os

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def handle_post():
    if request.method == 'POST':

        json_data = request.json
        customer_email = json_data['customer']['email']
        print('Received a POST request!')
        print(customer_email)
    return 'ok2'

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 80))
    app.run(host='0.0.0.0', port=port)