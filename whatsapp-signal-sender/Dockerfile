FROM node:14

# Instala o Chromium e o Google Chrome Stable
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable

# Configura o usuário "node" para que ele possa usar o Chromium e o Google Chrome Stable
RUN mkdir -p /home/node/.config/google-chrome \
    && chown -R node:node /home/node/.config

USER node
# Copia os arquivos para dentro do container
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .

# Executa o script envia-whatsapp.js
CMD ["node", "envia-whatsapp.js"]