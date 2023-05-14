import { getConfig } from "./config"

it("should get env variables correctly", () => {
  const envVar = getConfig("TME_TOKEN")
  expect(envVar).toBe("testToken")
})


it("should throw Error if variable does not exist", () => {
  expect.assertions(1);
  try {
    getConfig("TME_TOKE" as any)
  } catch (e) {
    expect(e.message).toBe("TME_TOKE is does not exist in .env file");
  }
})

it("should get env variables correctly by passed array param", () => {
  const envVar = getConfig(["TME_TOKEN"])
  console.log(envVar)
  expect(envVar["TME_TOKEN"]).toBe("testToken")
})


it("should throw Error if variable does not exist", () => {
  expect.assertions(1);
  try {
    getConfig(["TME_TOKE"] as any)
  } catch (e) {
    expect(e.message).toBe("TME_TOKE is does not exist in .env file");
  }
})


