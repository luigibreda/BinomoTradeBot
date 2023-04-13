import logging
import asyncio
import aiohttp
import json
from telethon import TelegramClient, events

# Configure as variáveis abaixo com suas credenciais do Telegram
api_id = 23916081
api_hash = '3192725f34fc40a99185242c5c7572e9'
phone_number = '+5547991049102'  # Seu número de telefone, incluindo código do país

# Configure a sessão abaixo com o nome da sessão que você escolheu anteriormente
session_name = 'session_name'

# Configure o webhook abaixo com a URL do seu webhook
webhook_url = 'https://binomotradebot-production.up.railway.app/webhook'

# Configurar o logger
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

async def main():
    async with TelegramClient(session_name, api_id, api_hash) as client:
        await client.connect()
        if not await client.is_user_authorized():
            try:
                await client.send_code_request(phone_number)
                await client.sign_in(phone_number, input('Digite o código enviado: '))
            except Exception as e:
                logger.exception(f'Não foi possível fazer o login: {str(e)}')
                return
        logger.info('Você está logado no Telegram como %s', (await client.get_me()).username)

        # Obter todos os grupos
        async for dialog in client.iter_dialogs():
            logger.info('Grupo encontrado: %s, ID: %d', dialog.name, dialog.id)

        # Obter o grupo desejado
        group_entity = await client.get_entity(-1001756002871)

        # Receber e imprimir todas as novas mensagens do grupo
        @client.on(events.NewMessage(chats=group_entity))
        async def handler(event):
            logger.info('Nova mensagem recebida: %s', event.message.text)
            payload = json.dumps({'emit': 'direction', 'data': {'direction': 'UP', 'tradingAsset': 'EUR/USD', 'time': '1m'}})
            try:
                async with aiohttp.ClientSession() as session:
                    async with session.post(webhook_url, data=payload, headers={'Content-Type': 'application/json'}) as response:
                        if response.status != 200:
                            logger.warning('Erro ao enviar mensagem para o webhook: %d %s', response.status, response.reason)
                    await client.send_message(-1001509473574, event.message.text)
            except Exception as e:
                logger.exception(f'Não foi possível enviar mensagem para o webhook: {str(e)}')
            else:
                logger.info('Mensagem enviada com sucesso para o webhook')

        # Executar o cliente em segundo plano
        await client.run_until_disconnected()

if __name__ == '__main__':
    asyncio.run(main())
