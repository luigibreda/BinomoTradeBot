from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['POST'])
def handle_post():
    print('Received a POST request!')
    return 'OK'

if __name__ == '__main__':
    app.run(port=80)