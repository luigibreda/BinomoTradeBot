import logging
import asyncio
import aiohttp
import json
from telethon import TelegramClient, events
import re
from datetime import datetime, time
import pytz

from datetime import datetime

# Configure as variáveis abaixo com suas credenciais do Telegram
api_id = 23916081
api_hash = '3192725f34fc40a99185242c5c7572e9'
phone_number = '+5547991049102'  # Seu número de telefone, incluindo código do país

# Configure a sessão abaixo com o nome da sessão que você escolheu anteriormente
session_name = 'session_name'

# Configure o webhook abaixo com a URL do seu webhook
webhook_url = 'https://binomotradebot-production.up.railway.app/webhook'
mercados_validos = ["Crypto IDX", "EUR/USD", "USD/CAD", "USD/JPY", "EUR/MNX", "USD/CHF", "AUD/NZD", "NDX/USD", "EUR/NZD", "EUR/JPY", "EUR IXD", "AUD/USD", "AUD/CAD", "AUD/JPY", "DJI/USD (OTC)", "CHF/JPY", "NZD/USD", "NZD/JPY", "ADA/USD"]
novos_mercados = ["EUR/USD (OTC)", "GBP/USD (OTC)", "USD/JPY (OTC)", "GBP/JPY (OTC)", "AUD/CAD (OTC)", "EUR/CAD (OTC)", "NDX/USD (OTC)", "DJI/USD (OTC)", "SPX/USD (OTC)"]
mercados_validos.extend(novos_mercados)

# Configurar o logger
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

async def post_webhook(payload):
    ativo = json.loads(payload)['data']['tradingAsset']
    if '-OTC' in ativo:
        ativo = ativo.replace('-OTC', '')
        mercado = ativo[:3] + '/' + ativo[3:] + ' (OTC)'
    elif len(ativo) == 6:
        mercado = ativo[:3] + '/' + ativo[3:]
    else:
        logger.warning(f'O ativo {ativo} não está na lista de mercados válidos')
        return

    # print(mercado)
    if mercado in mercados_validos:
        # Adiciona o mercado modificado ao payload
        payload_dict = json.loads(payload)
        payload_dict['data']['tradingAsset'] = mercado
        payload = json.dumps(payload_dict)
        logger.info(f'JSON: {payload}')
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(webhook_url, data=payload, headers={'Content-Type': 'application/json'}) as response:
                    if response.status == 200:
                        logger.info('Mensagem enviada com sucesso para o webhook')
                    else:
                        logger.warning('Erro ao enviar mensagem para o webhook: %d %s', response.status, response.reason)
        except Exception as e:
            logger.exception(f'Não foi possível enviar mensagem para o webhook: {str(e)}')
    else:
        logger.warning(f'O ativo {mercado} não está na lista de mercados válidos')

async def main():
    # payload = json.dumps({"emit": "direction-auto", "data": {"direction": "DOWN", "tradingAsset": "USDCAD ", "time": "5M"}})
    # await post_webhook(payload)
    # return
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
  
        # Obter os grupos desejados
        group_entities = []
        group_entities.append(await client.get_entity(-961285460))
        group_entities.append(await client.get_entity(-1001756002871))

        # Receber e imprimir todas as novas mensagens dos grupos
        @client.on(events.NewMessage(chats=group_entities))
        async def handler(event):

            if "SINAL VIP" in event.message.text:
                #logger.info('Nova mensagem recebida: %s', event.message.text)

                # encontra os links e substitui o texto desejado
                nova_mensagem = re.sub(r'https://bit\.ly/CriarConta-PocketOption', 'https://bit.ly/binomo_brazill', event.message.text)
                nova_mensagem = re.sub(r'https://bit\.ly/CadastroPocket', 'https://bit.ly/binomo_brazill', nova_mensagem)

                # regex para extrair o mercado e a direção da operação
                mercado_direcao_regex = re.search(r'•\s(.+)\s-\s(.+)\s-\s', event.message.text)
                mercado = mercado_direcao_regex.group(1).replace(" ", "")
                direcao = mercado_direcao_regex.group(2).replace(" ", "")

                # regex para extrair o tempo de expiração
                tempo_expiracao_regex = re.search(r'Expiração:\s(\d+)\sminutos\s\((\w+)\)', event.message.text)
                tempo = tempo_expiracao_regex.group(1)
                unidade_tempo = tempo_expiracao_regex.group(2)

                # regex para extrair o número de martingale
                martingale_regex = re.search(r'fazer\saté\s(\d+)\sGale', event.message.text)
                martingale = martingale_regex.group(1)

                padrao = r'(\d{2}:\d{2})\s'
                hora_encontrada = re.search(padrao, event.message.text)
                hora_encontrada = hora_encontrada.group(1)

                logger.info(f'Sinal encontrado: Mercado: {mercado} Direção: {direcao} Tempo de expiração: {unidade_tempo} Martingale: {martingale} Hora: {hora_encontrada}')

                # Trata a direção para enviar de acordo com nossa API
                direcao = 'DOWN' if direcao == 'PUT' else 'UP' if direcao == 'CALL' else direcao

                # Inverte a variável de direção 
                unidade_tempo_invertida = unidade_tempo[::-1]

                payload = json.dumps({'emit': 'direction-auto', 'data': {'direction': direcao, 'tradingAsset': mercado, 'time': unidade_tempo_invertida}})
                print(payload)

                # Define o fuso horário para o GMT-3
                tz = pytz.timezone('America/Sao_Paulo')
                # Obtém a hora atual no fuso horário definido
                agora = datetime.now(tz)
                # Converte a string de expiração em um objeto datetime
                expiracao = datetime.strptime(hora_encontrada, "%H:%M")
                # Combina a data atual e a hora de expiração no fuso horário definido
                expiracao_completa = tz.localize(datetime.combine(agora.date(), expiracao.time()))
                # Calcula a diferença entre os dois tempos
                diferenca = expiracao_completa - agora
                segundos_restantes = diferenca.seconds

                await client.send_message(-1001509473574, nova_mensagem)
                logger.info('Inicia contador')
                logger.info(segundos_restantes)
                await asyncio.sleep(segundos_restantes)
                logger.info('Termina contador')
                await post_webhook(payload)
                
            else:
                logger.info('Mensagem recebida, mas NÃO é sinal.')

        # Executar o cliente em segundo plano
        await client.run_until_disconnected()

if __name__ == '__main__':
    asyncio.run(main())
