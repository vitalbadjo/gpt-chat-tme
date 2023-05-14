"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gpt = void 0;
var tslib_1 = require("tslib");
var openai_1 = require("openai");
var config_1 = require("./config");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
var OpenAi = /** @class */ (function () {
    function OpenAi(apiKey) {
        var conf = new openai_1.Configuration({ apiKey: apiKey });
        this.openai = new openai_1.OpenAIApi(conf);
    }
    OpenAi.prototype.getReply = function (messages) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var responce, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.openai.createChatCompletion({
                                model: "gpt-3.5-turbo",
                                messages: messages
                            })];
                    case 1:
                        responce = _b.sent();
                        return [2 /*return*/, (_a = responce.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content];
                    case 2:
                        error_1 = _b.sent();
                        console.log("Error when handling request to gpt-chat", error_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, ""];
                }
            });
        });
    };
    return OpenAi;
}());
exports.gpt = new OpenAi((0, config_1.getConfig)("OPENAI_API_TOKEN"));
