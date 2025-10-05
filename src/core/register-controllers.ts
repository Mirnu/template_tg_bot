import { Telegraf } from "telegraf";
import { ROUTES_KEY } from "./metadata/metadata-keys";

export function registerControllers(bot: Telegraf, controllerInstances: any[]) {
  controllerInstances.forEach(instance => {
    const prototype = Object.getPrototypeOf(instance);
    const routes = Reflect.getMetadata(ROUTES_KEY, prototype) || [];
    routes.forEach(({ command, method }: { command: string; method: string }) => {
      bot.command(command, (ctx) => instance[method](ctx));
    });
  });
}
