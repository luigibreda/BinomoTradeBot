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
api_id = 18414817
api_hash = '76a4b4fc17923a688267b9fd55009953'
phone_number = '+5547936189205'  # Seu número de telefone, incluindo código do país

# Configure a sessão abaixo com o nome da sessão que você escolheu anteriormente
session_name = 'session_telegram_luigi'

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
    # payload = json.dumps({'emit': 'direction-auto', 'data': {'direction': "DOWN", 'tradingAsset': "EURUSD", 'time': "1M"}})
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
        group_entities.append(await client.get_entity(-1001858577085))
        group_entities.append(await client.get_entity(-1001935115707))
        group_entities.append(await client.get_entity(-1001922822962))
        group_entities.append(await client.get_entity(-1001924036057))
        group_entities.append(await client.get_entity(-1001517778355))

        # Receber e imprimir todas as novas mensagens dos grupos
        @client.on(events.NewMessage(chats=group_entities))
        async def handler(event):

            if "AO VIVO" in event.message.text:
                event.message.text = event.message.text.replace("📊 Ativo:", "Ativo:")
                event.message.text = event.message.text.replace("Ⓜ️ Expiração:", "Expiração:")
                event.message.text = event.message.text.replace("⏰ Entrada:", "Entrada:")
                regex = re.compile(r'Ativo: (.+)\nExpiração: (.+)\nEntrada: (.+)\n.*(put|call).*', re.IGNORECASE)
                match = regex.search(event.message.text)
                if match:
                    ativo = match.group(1).replace(" ", "")
                    tempo = match.group(2).replace(" ", "")
                    hora = match.group(3).replace(" ", "")
                    direcao = match.group(4).upper().replace(" ", "")

                    logger.info(f'Sinal encontrado: Mercado: {ativo} Direção: {direcao} Tempo de expiração: {tempo} Hora: {hora}')
                    nova_mensagem = f"""📊 SINAL VIP | Estratégia {tempo} 📊 \n\n• {ativo} - {direcao} - {hora} \n• Expiração: {tempo}\n\n📲 [Clique para Abrir a Corretora](https://bit.ly/binomo_brazill)"""
                    
                    ativo = ativo[:3] + '/' + ativo[3:] if len(ativo) == 6 else ativo
                    unidade_tempo_invertida = tempo[::-1]
                    direcao = 'DOWN' if direcao == 'PUT' else 'UP' if direcao == 'CALL' else direcao
                    payload = json.dumps({'emit': 'direction-auto', 'data': {'direction': direcao, 'tradingAsset': ativo, 'time': unidade_tempo_invertida}})
                    

                    # Define o fuso horário para o GMT-3
                    tz = pytz.timezone('America/Sao_Paulo')
                    # Obtém a hora atual no fuso horário definido
                    agora = datetime.now(tz)
                    # Converte a string de expiração em um objeto datetime
                    expiracao = datetime.strptime(hora, "%H:%M")
                    # Combina a data atual e a hora de expiração no fuso horário definido
                    expiracao_completa = tz.localize(datetime.combine(agora.date(), expiracao.time()))
                    # Calcula a diferença entre os dois tempos
                    diferenca = expiracao_completa - agora
                    segundos_restantes = diferenca.seconds

                    await client.send_message(-1001967330341, nova_mensagem)
                    logger.info('Inicia contador')
                    logger.info(segundos_restantes)
                    await asyncio.sleep(segundos_restantes)
                    logger.info('Termina contador')
                    await post_webhook(payload)
                else:
                    logger.warning('Padrão não encontrado na mensagem.')

            if "[ATENÇÃO]" in event.message.text:
                # Extrai as informações de ativo, expiração, tempo e direção
                padrao = r"^📊\s+(?P<ativo>\w+)\n🕓\s+(?P<expiracao>\d{2}:\d{2})\n⏳\s+(?P<tempo>\w+)\n(?:🔴|🟢)\s+(?P<direcao>\w+)"
                correspondencia = re.search(padrao, event.message.text, re.MULTILINE)

                if correspondencia:
                    ativo = correspondencia.group("ativo").replace(" ", "")
                    expiracao = correspondencia.group("expiracao").replace(" ", "")
                    tempo = correspondencia.group("tempo").replace(" ", "")
                    direcao = correspondencia.group("direcao").upper().replace(" ", "")

                    logger.info(f'Sinal encontrado: Mercado: {ativo} Direção: {direcao} Tempo de expiração: {expiracao} Hora: {tempo}')
                    nova_mensagem = f"""📊 SINAL VIP | Estratégia {tempo} 📊 \n\n• {ativo} - {direcao} - {expiracao} \n• Expiração: {tempo}\n\n📲 [Clique para Abrir a Corretora](https://bit.ly/binomo_brazill)"""

                    ativo = ativo[:3] + '/' + ativo[3:] if len(ativo) == 6 else ativo
                    unidade_tempo_invertida = tempo[::-1]
                    direcao = 'DOWN' if direcao == 'PUT' else 'UP' if direcao == 'CALL' else direcao
                    payload = json.dumps({'emit': 'direction-auto', 'data': {'direction': direcao, 'tradingAsset': ativo, 'time': unidade_tempo_invertida}})
                    

                    # Define o fuso horário para o GMT-3
                    tz = pytz.timezone('America/Sao_Paulo')
                    # Obtém a hora atual no fuso horário definido
                    agora = datetime.now(tz)
                    # Converte a string de expiração em um objeto datetime
                    expiracao = datetime.strptime(expiracao, "%H:%M")
                    # Combina a data atual e a hora de expiração no fuso horário definido
                    expiracao_completa = tz.localize(datetime.combine(agora.date(), expiracao.time()))
                    # Calcula a diferença entre os dois tempos
                    diferenca = expiracao_completa - agora
                    segundos_restantes = diferenca.seconds

                    await client.send_message(-1001967330341, nova_mensagem)
                    logger.info('Inicia contador')
                    logger.info(segundos_restantes)
                    await asyncio.sleep(segundos_restantes)
                    logger.info('Termina contador')
                    await post_webhook(payload)
                else:
                    logger.warning('Padrão não encontrado na mensagem.')

                #print(event.message.text)

                return

                # encontra os links e substitui o texto desejado
                nova_mensagem = re.sub(r'https://bit\.ly/CriarConta-PocketOption', 'https://bit.ly/FelipeBitcoin', event.message.text)
                nova_mensagem = re.sub(r'https://bit\.ly/CadastroPocket', 'https://bit.ly/FelipeBitcoin', nova_mensagem)

                # regex para extrair o mercado e a direção da operação
                mercado_direcao_regex = re.search(r'•\s(.+)\s-\s(.+)\s-\s', event.message.text)
                mercado = mercado_direcao_regex.group(1)
                direcao = mercado_direcao_regex.group(2)

                # regex para extrair o tempo de expiração
                tempo_expiracao_regex = re.search(r'Expiração:\s(\d+)\sminutos\s\((\w+)\)', event.message.text)
                tempo = tempo_expiracao_regex.group(1)
                unidade_tempo = tempo_expiracao_regex.group(2)

                # regex para extrair o número de martingale
                martingale_regex = re.search(r'fazer\saté\s(\d+)\sGale', event.message.text)
                martingale = martingale_regex.group(1)

                logger.info(f'Sinal encontrado: Mercado: {mercado} Direção: {direcao} Tempo de expiração: {unidade_tempo} Martingale: {martingale}')

                # Trata a variável de mercado conforme pede nossa API
                mercado = mercado[:3] + '/' + mercado[3:] if len(mercado) == 6 else mercado
                mercados_validos = ["EUR/USD", "USD/CAD", "USD/JPY", "EUR/MNX", "USD/CHF", "AUD/NZD", "NDX/USD", "EUR/NZD", "EUR/JPY", "EUR IXD", "AUD/USD", "AUD/CAD", "AUD/JPY", "DJI/USD (OTC)", "CHF/JPY", "NZD/USD", "NZD/JPY", "ADA/USD"]
                if mercado in mercados_validos:
                    logger.info("Mercado válido, enviando para o grupo e robo!")
                else:
                    logger.info("Mercado inválido, não está na lista dos que aceitamos!")
                
                # Trata a direção para enviar de acordo com nossa API
                direcao = 'DOWN' if direcao == 'PUT' else 'UP' if direcao == 'CALL' else direcao

                # Inverte a variável de direção 
                unidade_tempo_invertida = unidade_tempo[::-1]

                payload = json.dumps({'emit': 'direction-auto', 'data': {'direction': direcao, 'tradingAsset': mercado, 'time': unidade_tempo_invertida}})
                logger.info(f'JSON: {payload}')
                try:
                    async with aiohttp.ClientSession() as session:
                        if mercado in mercados_validos:
                            async with session.post(webhook_url, data=payload, headers={'Content-Type': 'application/json'}) as response:
                                if response.status == 200:
                                    logger.info('Mensagem enviada com sucesso para o webhook')
                                else:
                                    logger.warning('Erro ao enviar mensagem para o webhook: %d %s', response.status, response.reason)
                        await client.send_message(-961285460, nova_mensagem)
                except Exception as e:
                    logger.exception(f'Não foi possível enviar mensagem para o webhook: {str(e)}')

        # Executar o cliente em segundo plano
        await client.run_until_disconnected()

if __name__ == '__main__':
    asyncio.run(main())
