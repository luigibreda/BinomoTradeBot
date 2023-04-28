FROM node:14-slim

# Instala o Chromium
RUN rm /etc/apt/preferences.d/no-debian-php && \
    apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends apt-utils dialog 2>&1 && \
    apt-get install -y \
    wget \
    gnupg \
    libgbm-dev \
    libfontconfig \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    ttf-freefont

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
  && apt-get update \
  && apt-get install -y google-chrome-unstable \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /src/*.deb

# Cria e define a pasta de trabalho
WORKDIR /usr/src/app

# Copia os arquivos do projeto para a imagem
COPY . .

# Instala as dependências do projeto
RUN npm install

# Define as variáveis de ambiente
ENV PORT=8080

# Expõe a porta usada na aplicação
EXPOSE 8080

# Inicia a aplicação
CMD ["npm", "start"]
