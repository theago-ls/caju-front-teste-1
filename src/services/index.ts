import { apiProvider } from "./provider"

export const getRegistrations = async (cpf?: string): Promise<Registration[]> => {
  const response = await apiProvider.get(`/registrations${cpf ? "?cpf="+cpf : ""}`)

  return response.data
}