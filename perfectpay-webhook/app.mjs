import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';


const app = express();

app.use(bodyParser.json());

app.post('/', async (req, res) => {
  
  const { customer } = req.body;
  const customerEmail = customer.email;

  console.log(`Webhook recebido para o email ${customerEmail}`);

  // Cria o payload com os dados do usuário
  const username = customerEmail.split('@')[0]; // Usa o email do cliente como nome de usuário
  const password = 'Senha123Padrao'; // Define uma senha padrão
  const payload = {
    username,
    password,
    plan: '2',
    expiresIn: 30,
  };

  // Envia a requisição POST para criar o usuário
  try {
    const response = await fetch('https://binomotradebot-production.up.railway.app/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 201) {
      console.log(`Usuário criado com sucesso para o email: ${customerEmail} - Login: ${username} e Senha: ${password}`);
    } else {
      console.error(`Erro ao criar usuário para o email ${customerEmail}`);
    }
  } catch (error) {
    console.error(`Erro ao criar usuário para o email ${customerEmail}: ${error}`);
  }

  res.send('Webhook recebido com sucesso!');
});

const server = createServer(app);

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
