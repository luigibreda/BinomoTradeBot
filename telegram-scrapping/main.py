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
session_name = 'session_name_felipe'

# Configure o webhook abaixo com a URL do seu webhook
webhook_url = 'https://binomotradebot-production.up.railway.app/webhook'
mercados_validos = ["Crypto IDX", "EUR/USD", "USD/CAD", "USD/JPY", "EUR/MNX", "USD/CHF", "AUD/NZD", "NDX/USD", "EUR/NZD", "EUR/JPY", "EUR IXD", "AUD/USD", "AUD/CAD", "AUD/JPY", "DJI/USD (OTC)", "CHF/JPY", "NZD/USD", "NZD/JPY", "ADA/USD", "GBP/JPY", "USD/JPY", "USD/CHF", "AUD/USD", "EUR/JPY", "EUR/USD", "USD/CAD"]
# novos_mercados = ["EUR/USD (OTC)", "GBP/USD (OTC)", "USD/JPY (OTC)", "GBP/JPY (OTC)", "AUD/CAD (OTC)", "EUR/CAD (OTC)", "NDX/USD (OTC)", "DJI/USD (OTC)", "SPX/USD (OTC)"]
# mercados_validos.extend(novos_mercados)

# Configurar o logger
logging.basicConfig(format='%(asctime)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

async def post_webhook(payload):
    ativo = json.loads(payload)['data']['tradingAsset'].replace(" ", "")
    ativo_formatado = format_ativo(ativo)

    if not ativo_formatado:
        return False

    if ativo_formatado in mercados_validos:
        # Adiciona o mercado modificado ao payload
        payload_dict = json.loads(payload)
        payload_dict['data']['tradingAsset'] = ativo_formatado
        payload = json.dumps(payload_dict) 
        # logger.info(f'JSON: {payload}') 
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(webhook_url, data=payload, headers={'Content-Type': 'application/json'}) as response:
                    if response.status == 200:
                        logger.info('Mensagem enviada com sucesso para o webhook')
                        return True
                    else:
                        logger.error('Erro ao enviar mensagem para o webhook: %d %s', response.status, response.reason)
                        return False
        except Exception as e:
            logger.exception(f'Não foi possível enviar mensagem para o webhook: {str(e)}')
            return False
    else:
        logger.error(f'O ativo {ativo_formatado} não está na lista de mercados válidos #1')
        return False


async def main():
    # payload = json.dumps({"emit": "direction-auto", "data": {"direction": "UP", "tradingAsset": "USDCHF", "time": "5M"}})
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

                # # encontra os links e substitui o texto desejado
                # nova_mensagem = re.sub(r'https://bit\.ly/CriarConta-PocketOption', 'https://bit.ly/binomo_brazill', event.message.text)
                # nova_mensagem = re.sub(r'https://bit\.ly/CadastroPocket', 'https://bit.ly/binomo_brazill', nova_mensagem)

                # # regex para extrair o mercado e a direção da operação
                # mercado_direcao_regex = re.search(r'•\s(.+)\s-\s(.+)\s-\s', event.message.text)
                # mercado = mercado_direcao_regex.group(1).replace(" ", "")
                # direcao = mercado_direcao_regex.group(2).replace(" ", "")

                # # regex para extrair o tempo de expiração
                # tempo_expiracao_regex = re.search(r'Expiração:\s(\d+)\sminutos\s\((\w+)\)', event.message.text)
                # tempo = tempo_expiracao_regex.group(1)
                # unidade_tempo = tempo_expiracao_regex.group(2)

                # # regex para extrair o número de martingale
                # martingale_regex = re.search(r'fazer\saté\s(\d+)\sGale', event.message.text)
                # martingale = martingale_regex.group(1)

                # padrao = r'(\d{2}:\d{2})\s'
                # hora_encontrada = re.search(padrao, event.message.text)
                # hora_encontrada = hora_encontrada.group(1)

                mensagem_sem_links = replace_links(event.message.text)
                signal_info = extract_signal_info(mensagem_sem_links)
                direcao_formatada = format_direction(signal_info['direcao'])
                unidade_tempo_invertida = invert_time_unit(signal_info['unidade_tempo'])
                payload = build_payload(direcao_formatada, signal_info['mercado'], unidade_tempo_invertida)

                logger.warning(f"Sinal encontrado: Mercado: {signal_info['mercado']} Direção: {direcao_formatada} Tempo de expiração: {unidade_tempo_invertida} Martingale: {signal_info['martingale']} Hora: {signal_info['hora']}")
                # print(payload)

                # # Trata a direção para enviar de acordo com nossa API
                # direcao = 'DOWN' if direcao == 'PUT' else 'UP' if direcao == 'CALL' else direcao

                # # Inverte a variável de direção 
                # unidade_tempo_invertida = unidade_tempo[::-1]

                # payload = json.dumps({'emit': 'direction-auto', 'data': {'direction': direcao, 'tradingAsset': mercado, 'time': unidade_tempo_invertida}})
                # logger.info(payload)

                # await client.send_message(-1001509473574, mensagem_sem_links)
                # # logger.info('Iniciando contagem regressiva para expiração do sinal')
                # logger.info(f'Segundos restantes para executar o sinal: {segundos_restantes}')
                # await asyncio.sleep(segundos_restantes)
                # # logger.info('Contagem regressiva encerrada')
                # await post_webhook(payload)

                # trecho de código modificado
                # mensagem = mensagem_sem_links + "\n\n 🚀 Sinal enviado para o Robô 🚀\n[🤖 ](https://cashalien.com.br/)[Clique para comprar o Robô](https://cashalien.com.br/)"
                # logging.warning(mensagem_sem_links)
                # await client.send_message(-1001509473574, mensagem_sem_links) # Grupo Produção
                # await client.send_message(-1001814246476, mensagem) # Grupo Teste

                ativo = json.loads(payload)['data']['tradingAsset'].replace(" ", "")
                ativo_formatado = format_ativo(ativo)

                if not ativo_formatado:
                    return False

                if ativo_formatado in mercados_validos:
                    # print("mercado válido")
                    mensagem = mensagem_sem_links + "\n\n 🚀 **Sinal enviado para o Robô** 🚀\n[🤖](https://cashalien.com.br/)[Clique para comprar o Robô](https://cashalien.com.br/)"
                    await client.send_message(-1001509473574, mensagem, parse_mode='md') # Grupo Produção
                    await client.send_message(-1001814246476, mensagem, parse_mode='md') # Grupo Teste
                else:
                    # print("inválido")
                    await client.send_message(-1001509473574, mensagem_sem_links) # Grupo Produção
                    await client.send_message(-1001814246476, mensagem_sem_links) # Grupo Teste


                segundos_restantes = calcular_segundos_restantes(signal_info['hora'])
                logger.info(f'Segundos restantes para executar o sinal: {segundos_restantes}')
                await asyncio.sleep(segundos_restantes)
                enviado = await post_webhook(payload)
                # if enviado:
                    # await client.send_message(-1001509473574, mensagem_sem_links)

            # else:
                # logger.info('Mensagem recebida, mas NÃO é sinal.')

        # Executar o cliente em segundo plano
        await client.run_until_disconnected()

def calcular_segundos_restantes(hora_encontrada):
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
    return segundos_restantes

def format_ativo(ativo):
    if '-OTC' in ativo:
        ativo = ativo.replace('-OTC', '')
        ativo = ativo[:3] + '/' + ativo[3:] + ' (OTC)'
    elif len(ativo) == 6:
        ativo = ativo[:3] + '/' + ativo[3:]
        # print('chegou no if')
    else:
        logging.warning(f'O ativo {ativo} não está no formato que reconhecemos como mercado.')
        return False
    
    return ativo

def replace_links(mensagem):
    nova_mensagem = re.sub(r'https://bit\.ly/CriarConta-PocketOption', 'https://bit.ly/binomo_brazill', mensagem)
    nova_mensagem = re.sub(r'https://bit\.ly/CadastroPocket', 'https://bit.ly/binomo_brazill', nova_mensagem)
    return nova_mensagem

def extract_signal_info(mensagem):
    signal_info = {}

    mercado_direcao_regex = re.search(r'•\s(.+)\s-\s(.+)\s-\s', mensagem)
    signal_info['mercado'] = mercado_direcao_regex.group(1).replace(" ", "")
    signal_info['direcao'] = mercado_direcao_regex.group(2).replace(" ", "")

    tempo_expiracao_regex = re.search(r'Expiração:\s(\d+)\sminutos\s\((\w+)\)', mensagem)
    signal_info['tempo'] = tempo_expiracao_regex.group(1)
    signal_info['unidade_tempo'] = tempo_expiracao_regex.group(2)

    martingale_regex = re.search(r'fazer\saté\s(\d+)\sGale', mensagem)
    signal_info['martingale'] = martingale_regex.group(1)

    padrao = r'(\d{2}:\d{2})\s'
    hora_encontrada = re.search(padrao, mensagem)
    signal_info['hora'] = hora_encontrada.group(1)

    return signal_info

def format_direction(direcao):
    if direcao == 'PUT':
        return 'DOWN'
    elif direcao == 'CALL':
        return 'UP'
    else:
        return direcao

def invert_time_unit(unidade_tempo):
    return unidade_tempo[::-1]

def build_payload(direcao, mercado, unidade_tempo_invertida):
    payload = json.dumps({
        'emit': 'direction-auto',
        'data': {
            'direction': direcao,
            'tradingAsset': mercado,
            'time': unidade_tempo_invertida
        }
    })
    return payload

if __name__ == '__main__':
    asyncio.run(main())
