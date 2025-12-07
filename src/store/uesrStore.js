import { createUser, loginUser } from "@/services/auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Cookies from "js-cookie";

export const userStore = create(
  devtools((set, get) => ({
    user: null,
    isLoggin: false,
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
        const response = await loginUser(value);

        // add token in cookie
        get().addCookie(response.token);
        set({ user: response.user });
      } catch (error) {
        console.error(error);
      }
    },
    createUser: async (value) => {
      try {
        console.log(value);
        //const response = await createUser(value);
      } catch (error) {
        console.error(error.message);
      }
    },
  }))
);
