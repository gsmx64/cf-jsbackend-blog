import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: {
    "Content-type": "application/json;charset=utf-8"
  }
});