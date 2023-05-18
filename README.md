![App Screenshot](https://perfectpay-files.s3.us-east-2.amazonaws.com/app/img/plan/PPPB4GB0/pplqqbpreimageheaderpathcheckout_1200x300.jpg)

# BinomoTradeBot

O projeto do robô de trade automático para Binomo é uma solução inovadora para ajudar investidores a tomarem decisões assertivas em suas negociações de opções binárias. Implementado em forma de extensão de navegador, o robô é capaz de realizar análises de mercado em tempo real e gerar insights relevantes para a tomada de decisão.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 
## Funcionalidades

- Integração com sala de sinais do Telegram.
- Operações executadas automáticamente pelo Robo. 
- CopyTrader manual seguindo os sinais do Felipe.
- Sistema de login e assinaturas.


## Versões

- 30/04/2023 - 1.0.0 - Lançamento versão inicial do sistema.
- 02/05/2023 - 1.0.1 - Removido delay da sala de sinais do telegram.
- 02/05/2023 - 1.0.2 - Aviso no sinal do telegram que será enviado para o Robô.
- 05/05/2023 - 1.0.2 - Melhorias no layout, link de compra, contato suporte adicionados. 
- 09/05/2023 - 1.0.3 - Nova logo adicionada, ícones adicionados e prepação para novo layout.
- 10/05/2023 - 1.0.4 - Novo Layout, melhorias do código, melhorias na assetividade do Robô.
- 18/05/2023 - 1.0.5 - Criação de endpoints na API e melhoria na Integração com a perfectpay.

#### Próximas melhorias

- Melhoria em delay de operações ✔️
- Lançamento da extensão na loja de extensão da Google ✔️
- Interface do usuário do app ✔️
- Melhoria interface app ✔️
- Melhoria no e-mail de envio de dados
- Criação de webhook para atualizar assinatura e excluir usuário ✔️


## Screenshots

![App Screenshot](https://lh3.googleusercontent.com/svacrg9UBsoeSKmkxntOdmrzEonxB9Fu0UfxCNO_w0as6JNFHM4JSDOBFwvwbp6hcOxckwopNvmWOI8qzHqWoafZyA=w640-h400-e365-rj-sc0x00ffffff)


![App Screenshot](https://lh3.googleusercontent.com/dwita2vj2V8jtD6Mc7PmAW61pBUUYMTC_Yf6BCU3aKAjSpqYccWOXqWLTtq9UaBPsiu-_X3nhFC86XKa-58QNIFRXA=w640-h400-e365-rj-sc0x00ffffff)

![App Screenshot](https://lh3.googleusercontent.com/wppKy9RCgOzJVN9j036NNYPVhUXaO53HKNxi95c6-h1cXgXrCer6chygXdf6p-kDDdX7i-16hAw7W0f69xvJfs-A=w640-h400-e365-rj-sc0x00ffffff)

![App Screenshot](https://lh3.googleusercontent.com/wjzSER2nniXStTqr1DL-I7JYd8C-s7_sZX6Uc7r-gvy3jrgqwOrk7ncHCYvn2EXllieBgI3MB5AwGbTpW_diuYF1=w640-h400-e365-rj-sc0x00ffffff)


## Documentação da API

* ### REGISTRAR NOVO USUÁRIO

```
  POST /api/auth/register
```


Este endpoint é usado para excluir um usuário. Ele requer um objeto JSON da PerfectPay, mas apenas o campo de email do JSON é utilizado.

### Parâmetros

| Resposta de sucesso           | Resposta de erro                                                     |
| ---------------------------- | -------------------------------------------------------------------- |
| **Status**: 200 OK           | **Status**: 400 Bad Request                                          |
| **Corpo da resposta**: Vazio | **Corpo da resposta**: Um objeto JSON contendo detalhes do erro      |

### Exemplo do JSON a ser enviado

```json
{
  "customers": {
    "email": "exemplo@email.com"
  }
}
```

* ### ATUALIZAR ASSINATURA DO USUÁRIO

```
  POST /api/auth/update
```

Este endpoint é usado para atualizar a assinatura do usuário, aumentando o tempo de expiração na conta dele.

#### Parâmetros

| Parâmetro   | Tipo       | Descrição                                                        |
| :---------- | :--------- | :--------------------------------------------------------------- |
| `email`     | `string`   | **Obrigatório**. O email do usuário para atualizar a assinatura. |


#### Retorno

| Resposta de sucesso                          | Resposta de erro                                         |
| ------------------------------------------- | -------------------------------------------------------- |
| **Status**: 200 OK                          | **Status**: 400 Bad Request                              |
| **Corpo da resposta**: Vazio                | **Corpo da resposta**: Um objeto JSON contendo detalhes do erro |

#### Exemplo do JSON a ser enviado

```json
{
  "customers": {
    "email": "exemplo@email.com"
  }
}
```

* ### REMOVER USUÁRIO

```
POST /api/auth/remove
```

Este endpoint é usado para remover um usuário.

#### Parâmetros

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `email`   | `string` | **Obrigatório**. O email do usuário a ser removido. |

#### Retorno

| Resposta de sucesso                        | Resposta de erro                                       |
| ----------------------------------------- | ------------------------------------------------------ |
| **Status**: 200 OK                        | **Status**: 400 Bad Request                            |
| **Corpo da resposta**: Vazio              | **Corpo da resposta**: Um objeto JSON contendo detalhes do erro |

#### Exemplo do JSON a ser enviado

```json
{
  "customers": {
    "email": "exemplo@email.com"
  }
}
```
