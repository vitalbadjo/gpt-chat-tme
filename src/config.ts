type TokenName = "TME_TOKEN" | "OPENAI_API_TOKEN"

export function getConfig<T extends TokenName | TokenName[]>(tokenName: T): (T extends TokenName ? string : Record<TokenName, string>) {

  if (Array.isArray(tokenName) && typeof tokenName === "object") {
    const result = tokenName.reduce((p, c) => {
      const token = process.env[c]
      if (token) {
        p[c] = token
        return p
      } else {
        const errorMEssage = `${c} is does not exist in .env file`
        throw new Error(errorMEssage)
      }
    }, {} as Record<TokenName, string>)
    return result as T extends TokenName ? string : Record<TokenName, string>
  } else {
    const result = process.env[tokenName as string]
    if (result) {
      return result as T extends TokenName ? string : Record<TokenName, string>
    } else {
      const errorMEssage = `${tokenName} is does not exist in .env file`
      throw new Error(errorMEssage)
    }
  }
}
