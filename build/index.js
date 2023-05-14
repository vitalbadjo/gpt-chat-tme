"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var telegraf_1 = require("telegraf");
var format_1 = require("telegraf/format");
var filters_1 = require("telegraf/filters");
var config_1 = require("./config");
var dotenv = tslib_1.__importStar(require("dotenv"));
var gpt_1 = require("./gpt");
dotenv.config();
var bot = new telegraf_1.Telegraf((0, config_1.getConfig)("TME_TOKEN"));
bot.on((0, filters_1.message)("text"), function (ctx) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a, reply;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.message.text;
                switch (_a) {
                    case "/start": return [3 /*break*/, 1];
                }
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, ctx.reply("Привет я бот-прокладка между тобой и gpt-chat. \nСпроси меня о чем ни будь?")];
            case 2:
                _b.sent();
                return [3 /*break*/, 10];
            case 3: return [4 /*yield*/, ctx.reply((0, format_1.code)("Я отправил твой запрос в gpt-chat, жду ответа..."))];
            case 4:
                _b.sent();
                return [4 /*yield*/, gpt_1.gpt.getReply([{ role: "user", content: ctx.message.text }])];
            case 5:
                reply = _b.sent();
                if (!reply) return [3 /*break*/, 7];
                return [4 /*yield*/, ctx.reply(reply)];
            case 6:
                _b.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, ctx.reply("Ответ пуст :(")];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9: return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
bot.launch();
process.once("SIGINT", function () { return bot.stop("Bot stopped by SIGINT"); });
process.once("SIGTERM", function () { return bot.stop("Bot stopped by SIGTERM"); });
