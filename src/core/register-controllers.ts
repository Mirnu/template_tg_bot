import { Telegraf } from "telegraf";
import { ROUTES_KEY } from "../metadata/metadata-keys";

export function registerControllers(bot: Telegraf, controllers: any[]) {
    controllers.forEach(controller => {
        const instance = new controller();
        const routes = Reflect.getMetadata(ROUTES_KEY, controller.prototype) || [];

        routes.forEach(({ command, method }: { command: string; method: string }) => {
            bot.command(command, (ctx) => {
                instance[method](ctx);
            });
        });
    });
}