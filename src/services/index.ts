import { apiProvider } from "./provider"

export const getRegistrations = async (cpf?: string): Promise<Registration[]> => {
  const response = await apiProvider.get(`/registrations${cpf ? "?cpf="+cpf : ""}`)

  return response.data
}


export const updateRegistration = async (registration: Registration): Promise<Registration[]> => {
  const response = await apiProvider.put(`/registrations/${registration.id}`, registration)

  return response.data
}

export const deleteRegistration = async (registrationID: string): Promise<Registration[]> => {
  const response = await apiProvider.delete(`/registrations/${registrationID}`)

  return response.data
}

export const createRegistration = async (registration: Omit<Registration, "id">): Promise<Registration[]> => {
  const response = await apiProvider.post('/registrations', registration)

  return response.data
}