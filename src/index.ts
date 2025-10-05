import 'reflect-metadata';
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { ROUTES_KEY } from './core/metadata/metadata-keys';
import { loadControllers } from './core/load-controllers';
import path from 'path';
import { registerControllers } from './core/register-controllers';
import loadClasses from './core/load-classes';
import { DIContainer } from './core/DIContainer';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    throw new Error('BOT_TOKEN is not defined');
}

const bot = new Telegraf(BOT_TOKEN);

(async () => {
    const classesDir = path.join(__dirname, 'classes');
    const controllersDir = path.join(__dirname, 'classes/controllers');

    const classesMap = await loadClasses(classesDir);

    const container = new DIContainer(classesMap);

    const controllers = await loadControllers(controllersDir);

    const myControllerInstance = controllers.map((controller) => container.resolve(controller));

    // Передаём в регистратор контроллеров уже созданный экземпляр, либо так же для всех
    registerControllers(bot, myControllerInstance);
})();


bot.launch().then(() => console.log('Бот started'));
