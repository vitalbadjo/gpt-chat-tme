"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
function getConfig(tokenName) {
    if (Array.isArray(tokenName) && typeof tokenName === "object") {
        var result = tokenName.reduce(function (p, c) {
            var token = process.env[c];
            if (token) {
                p[c] = token;
                return p;
            }
            else {
                var errorMEssage = "".concat(c, " is does not exist in .env file");
                throw new Error(errorMEssage);
            }
        }, {});
        return result;
    }
    else {
        var result = process.env[tokenName];
        if (result) {
            return result;
        }
        else {
            var errorMEssage = "".concat(tokenName, " is does not exist in .env file");
            throw new Error(errorMEssage);
        }
    }
}
exports.getConfig = getConfig;
