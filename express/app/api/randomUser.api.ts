import axios from "axios";

export const randomUserDataAxiosInstance = axios.create({
  baseURL: process.env.RANDOM_USER_API_URL,
});
