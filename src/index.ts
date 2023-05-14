import { Telegraf } from "telegraf"
import { code } from "telegraf/format"
import { message } from "telegraf/filters"
import { getConfig } from "./config"
import dotenv from "dotenv"
import { gpt } from "./gpt";

dotenv.config();

const bot = new Telegraf(getConfig("TME_TOKEN"))

bot.on(message("text"), async ctx => {

  switch (ctx.message.text) {
    case "/start":
      await ctx.reply("Привет я бот-прокладка между тобой и gpt-chat. \nСпроси меня о чем ни будь?")
      break;

    default:
      await ctx.reply(code("Я отправил твой запрос в gpt-chat, жду ответа..."))

      const reply = await gpt.getReply([{ role: "user", content: ctx.message.text }])

      if (reply) {
        await ctx.reply(reply)
      } else {
        await ctx.reply("Ответ пуст :(")
      }

      break;
  }
})

bot.launch()

process.once("SIGINT", () => bot.stop("Bot stopped by SIGINT"))
process.once("SIGTERM", () => bot.stop("Bot stopped by SIGTERM"))