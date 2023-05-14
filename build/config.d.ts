type TokenName = "TME_TOKEN" | "OPENAI_API_TOKEN";
export declare function getConfig<T extends TokenName | TokenName[]>(tokenName: T): (T extends TokenName ? string : Record<TokenName, string>);
export {};
