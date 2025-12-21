import { fetcher } from "./wrapper/fetcher";

const url = import.meta.env.VITE_API_URL;

export const loginUserService = (data) =>
  fetcher(`${url}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const createUserService = (data) =>
  fetcher(`${url}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const forgotPasswordService = (data) =>
  fetcher(`${url}/auth/forgot-password`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const resendCodeService = (data) =>
  fetcher(`${url}/auth/resend-code`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const verifyOTPService = (data) =>
  fetcher(`${url}/auth/verify-otp`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const resetPasswordService = (data) =>
  fetcher(`${url}/auth/reset-password`, {
    method: "POST",
    body: JSON.stringify(data),
  });
