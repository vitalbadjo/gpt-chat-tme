import { Context, Telegraf, session } from "telegraf"
import { code } from "telegraf/format"
import { message } from "telegraf/filters"
import { getConfig } from "./config"
import * as dotenv from "dotenv"
import { gpt } from "./gpt";

dotenv.config();

interface CustomContext extends Context {
  session: {
    messages: {
      role: "user" | "assistant",
      content: string
    }[]
  }
}

const bot = new Telegraf<CustomContext>(getConfig("TME_TOKEN"))

bot.use(session())

bot.command('start', async (ctx) => {
  ctx.session = { messages: [] }
  await ctx.reply("Привет я бот-прокладка между тобой и gpt-chat. \nСпроси меня о чем ни будь?")
})

bot.command("new_context", async (ctx) => {
  ctx.session = { messages: [] }
  await ctx.reply(code("Отлично! Создан новый контекст для общения с gpt-chat"))
})

bot.on(message("text"), async ctx => {
  ctx.session ??= { messages: [] }
  await ctx.reply(code("Я отправил твой запрос в gpt-chat, жду ответа..."))

  ctx.session.messages.push({ role: "user", content: ctx.message.text })

  const reply = await gpt.getReply(ctx.session.messages)

  if (reply) {
    ctx.session.messages.push({ role: "assistant", content: reply })
    console.log(ctx.session.messages)
    await ctx.reply(reply)
  } else {
    await ctx.reply("Ответ пуст :(")
  }
})

bot.launch()

process.once("SIGINT", () => bot.stop("Bot stopped by SIGINT"))
process.once("SIGTERM", () => bot.stop("Bot stopped by SIGTERM"))