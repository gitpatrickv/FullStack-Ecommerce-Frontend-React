import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
    jwtToken: string;
}

interface AuthQueryStore {
    authStore: AuthStore;
    setJwtToken: (jwtToken: string) => void;
    logout: (navigate: (path: string) => void) => void;
}

export const useAuthQueryStore = create<AuthQueryStore>()(
    persist(
        (set) => ({
            authStore: {
                jwtToken: sessionStorage.getItem("jwtToken") || "",
            },
            setJwtToken: (jwtToken) => {
                sessionStorage.setItem("jwtToken", jwtToken);
                set((state) => ({ authStore: { ...state.authStore, jwtToken } }));
            },
            logout: (navigate) => {
                sessionStorage.removeItem("jwtToken");
                set((state) => ({ authStore: { ...state.authStore, jwtToken: "" } }));
                navigate("/");
            },
        }),
        {
            name: "auth-storage",
             getStorage: () => sessionStorage
        }
    )
);
