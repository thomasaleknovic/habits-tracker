import axios from "axios";

export const api = axios.create({
  baseURL: "https://habits-tracker-aleknovic.onrender.com",
});
