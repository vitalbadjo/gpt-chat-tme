import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
declare class OpenAi {
    openai: OpenAIApi;
    constructor(apiKey: string);
    getReply(messages: Array<ChatCompletionRequestMessage>): Promise<string | undefined>;
}
export declare const gpt: OpenAi;
export {};
