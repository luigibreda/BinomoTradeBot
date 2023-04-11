

import telegram
import asyncio
import aiohttp
import json
import logging

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure a API key abaixo com a sua chave do BotFather
bot_token = '6218389548:AAHZdie21j_A9GlBkMRTXfRIIFdBL2cLpOQ'

# Configure o webhook abaixo com a URL do seu webhook
webhook_url = 'https://binomotradebot-production.up.railway.app/webhook'

async def main():
    bot = telegram.Bot(token=bot_token)
    logger.info('Você está logado no Telegram')

    bot_info = await bot.get_me()

    logger.info('Bot conectado: %s (username: %s, ID: %d)', bot_info.first_name, bot_info.username, bot_info.id)
    logger.info('Bot pode ser encontrado em: t.me/%s', bot_info.username)

    # Obter as últimas atualizações
    updates = await bot.get_updates()

    # Percorrer as atualizações e extrair o chat ID de cada mensagem
    chat_ids = set()
    for update in updates:
        chat = update.effective_chat
        chat_id = chat.id
        chat_ids.add(chat_id)

    logger.info('Chats disponíveis: %s', chat_ids)

    # Obter o grupo desejado
    group_id = -814777352  # Insira o ID do grupo desejado
    group_entity = telegram.Chat(id=group_id, type='group')

    # Receber e enviar somente as novas mensagens do grupo
    offset = None
    while True:
        updates = await bot.get_updates(offset=offset, timeout=30)
        for update in updates:
            offset = update.update_id + 1
            if update.message.chat_id == group_id:
                logger.info('Nova mensagem recebida: %s', update.message.text)
                payload = json.dumps({'emit': 'direction-auto', 'data': {'message': 'UP', 'tradingAsset': 'EURUSD'}})
                try:
                    async with aiohttp.ClientSession() as session:
                        async with session.post(webhook_url, data=payload, headers={'Content-Type': 'application/json'}) as response:
                            if response.status != 200:
                                logger.warning('Erro ao enviar mensagem para o webhook: %d %s', response.status, response.reason)
                except Exception as e:
                    logger.exception(f'Não foi possível enviar mensagem para o webhook: {str(e)}')
                    
                logger.info('Mensagem enviada com sucesso ao webhook: %s', update.message.text)
        
        await asyncio.sleep(1)

asyncio.run(main())
