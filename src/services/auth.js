import { fetcher } from "./wrapper/fetcher";

const url = import.meta.env.VITE_API_URL;

export const loginUser = (data) =>
  fetcher(`${url}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const createUser = (data) =>
  fetcher(`${url}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });
