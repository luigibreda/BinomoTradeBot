import telegram
import logging

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure a API key abaixo com a sua chave do BotFather
bot_token = '5919151760:AAGUCyzy-vBcRucCvvXAzA3-Fh1W7Es4b7o'

async def main():
    bot = telegram.Bot(token=bot_token)
    logger.info('Você está logado no Telegram')

    bot_info = await bot.get_me()

    logger.info('Bot conectado: %s (username: %s, ID: %d)', bot_info.first_name, bot_info.username, bot_info.id)
    logger.info('Bot pode ser encontrado em: t.me/%s', bot_info.username)

    # Obter a lista de grupos
    chats = await bot.get_updates()

    # Percorrer as atualizações e extrair os grupos
    groups = set()
    for chat in chats:
        if chat.effective_chat.type == 'group':
            groups.add((chat.effective_chat.title, chat.effective_chat.id))

    logger.info('Grupos disponíveis:')
    for group in groups:
        logger.info('- %s (ID: %d)', group[0], group[1])

if __name__ == '__main__':
    import asyncio
    asyncio.run(main())
