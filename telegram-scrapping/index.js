const TelegramBot = require('node-telegram-bot-api');

// Replace with your BotFather token
const token = '6040401519:AAEUfFk2_EeXeVV_-TTafRCFUFvD2wcGqxY';

// Create a new bot instance
const bot = new TelegramBot(token, { polling: true });

// Test sending a message to yourself
const chatId = '-5837493071';
bot.sendMessage(chatId, 'Hello from your bot!');

// Listen for incoming messages
bot.on('message', (msg) => {
  console.log(msg);
});
