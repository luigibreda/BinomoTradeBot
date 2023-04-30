from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['POST'])
def webhook():
    json_data = request.json
    customer_email = json_data['customer']['email']
    print(f'Email do cliente: {customer_email}')
    return 'Webhook recebido com sucesso!'

if __name__ == '__main__':
    app.run(port=80)