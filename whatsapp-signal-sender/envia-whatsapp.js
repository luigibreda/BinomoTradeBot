const express = require('express');
const wbm = require('./src/index');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/', async (req, res) => {
    const { mensagem_sinal } = req.body;

    try {
        await wbm.start({ showBrowser: false });
        await wbm.sendToGroup(mensagem_sinal);
        await wbm.end();
        res.status(200).send('Mensagem enviada com sucesso!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao enviar mensagem!');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});