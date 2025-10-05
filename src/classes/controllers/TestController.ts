import { Command } from "@/core/decorators/command";
import Injectable from "@/core/decorators/Injectable";
import TestUtil from "../utils/TestUtil";

@Injectable()
export class TestController {
  public constructor(private TestUtil: TestUtil) {}

  @Command('start')
  startCommand(ctx: any) {
    this.TestUtil.Log();
    ctx.reply('Привет! Это стартовая команда.');
  }

  @Command('help')
  helpCommand(ctx: any) {
    ctx.reply('Вот что я умею...');
  }
}
