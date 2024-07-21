import axios from "axios"

export const apiProvider = axios.create({
  baseURL: "http://localhost:3000"
});