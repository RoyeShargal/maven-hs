import axios from "axios";

export const genderizeAxiosInstance = axios.create({
  baseURL: process.env.GENDERIZE_API_URL,
});
