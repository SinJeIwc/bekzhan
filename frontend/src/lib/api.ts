import ky from "ky";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const api = ky.create({
  prefix: API_URL,
});

export const BASE_URL = API_URL.replace(/\/api\/?$/, "");
