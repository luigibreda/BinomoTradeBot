from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/', methods=['POST'])
def handle_post():
    print('Received a POST request!')
    return 'OK'

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 80))
    app.run(host='192.168.0.4', port=port)