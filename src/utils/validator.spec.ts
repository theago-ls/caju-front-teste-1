import { validator } from "./validators"

describe("validator.cpf", () => {
  it("should return false for invalid CPF", () => {
    expect(validator.cpf("11111111111")).toBeFalsy()
  })

  it("should return true for valid CPF", () => {
    expect(validator.cpf("56180448035")).toBeTruthy()
  })
})