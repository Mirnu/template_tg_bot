import 'reflect-metadata';
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { ROUTES_KEY } from './metadata/metadata-keys';
import { loadControllers } from './core/load-controllers';
import path from 'path';
import { registerControllers } from './core/register-controllers';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    throw new Error('BOT_TOKEN is not defined');
}

const bot = new Telegraf(BOT_TOKEN);

(async () => {
  const controllersDir = path.resolve(__dirname, 'controllers');
  const controllers = await loadControllers(controllersDir);
  registerControllers(bot, controllers);
})();

bot.launch().then(() => console.log('Бот started'));
