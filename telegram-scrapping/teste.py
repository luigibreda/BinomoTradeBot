import logging
import asyncio
from telethon import TelegramClient

# Configure as variáveis abaixo com suas credenciais do Telegram
api_id = 18414817
api_hash = '76a4b4fc17923a688267b9fd55009953'
phone_number = '+5547936189205'  # Seu número de telefone, incluindo código do país

# Configure a sessão abaixo com o nome da sessão que você escolheu anteriormente
session_name = 'session_name'

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

        # Obter todos os chats
        async for dialog in client.iter_dialogs():
            logger.info('Chat encontrado: %s, ID: %d', dialog.name, dialog.id)

        # Executar o cliente em segundo plano
        await client.run_until_disconnected()

if __name__ == '__main__':
    asyncio.run(main())
