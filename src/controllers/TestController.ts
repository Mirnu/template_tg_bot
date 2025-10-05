import { Command } from "../metadata/command";

export class TestController {
  @Command('start')
  startCommand(ctx: any) {
    ctx.reply('Привет! Это стартовая команда.');
  }

  @Command('help')
  helpCommand(ctx: any) {
    ctx.reply('Вот что я умею...');
  }
}
