import { masks } from "./masks"

describe("masks.cpf", () => {
  it("should return CPF with the correct format", () => {
    expect(masks.cpf("11111111111")).toBe("111.111.111-11")
  })
})