import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"
import { getConfig } from "./config"
import dotenv from "dotenv"

dotenv.config();

class OpenAi {
  openai: OpenAIApi
  constructor(apiKey: string) {
    const conf = new Configuration({ apiKey })
    this.openai = new OpenAIApi(conf)
  }

  async getReply(messages: Array<ChatCompletionRequestMessage>) {
    try {
      const responce = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages
      })
      return responce.data.choices[0].message?.content
    } catch (error) {
      console.log("Error when handling request to gpt-chat", (error as any).message)
    }
    return ""
  }

}

export const gpt = new OpenAi(getConfig("OPENAI_API_TOKEN"))