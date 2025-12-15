import {
  createUserService,
  loginUserService,
  forgotPasswordService,
  verifyOTPService,
  resetPasswordService,
} from "@/services/auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Cookies from "js-cookie";

export const userStore = create(
  devtools((set, get) => ({
    user: null,
    isLoggin: !!Cookies.get("pharmaZone"),
    addCookie(token) {
      Cookies.set("pharmaZone", token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      set({ isLoggin: true });
    },

    removeCookie() {
      Cookies.remove("pharmaZone");
      set({ user: null, isLoggin: false });
    },

    login: async (value) => {
      try {
        const response = await loginUserService(value);

        // add token in cookie
        get().addCookie(response.token);
        set({ user: response.user, isLoggin: true });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    createUser: async (value) => {
      try {
        const response = await createUserService(value);
        get().addCookie(response.token);
        set({ user: response.user, isLoggin: true });
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    },

    forgotPassword: async (value) => {
      try {
        console.log(value);
        await forgotPasswordService(value);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    verifyOTP: async (value) => {
      try {
        await verifyOTPService(value);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    resetPassword: async (value) => {
      try {
        await resetPasswordService(value);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  }))
);
