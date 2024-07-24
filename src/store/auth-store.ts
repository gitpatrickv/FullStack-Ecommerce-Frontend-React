import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
    jwtToken: string;
    role: string;
}

interface AuthQueryStore {
    authStore: AuthStore;
    setJwtToken: (jwtToken: string) => void;
    setRole: (role: string) => void;
    logout: (navigate: (path: string) => void) => void;
}

export const useAuthQueryStore = create<AuthQueryStore>()(
    persist(
        (set) => ({
            authStore: {
                jwtToken: sessionStorage.getItem("jwtToken") || "",
                role: sessionStorage.getItem("role") || "",
            },
            setJwtToken: (jwtToken) => {
                sessionStorage.setItem("jwtToken", jwtToken);
                set((state) => ({ authStore: { ...state.authStore, jwtToken } }));
            },
            setRole: (role) => {
                sessionStorage.setItem("role", role);
                set((state) => ({ authStore: { ...state.authStore, role } }));
            },
            logout: (navigate) => {
                sessionStorage.removeItem("jwtToken");
                set((state) => ({ authStore: { ...state.authStore, jwtToken: "" } }));
                sessionStorage.removeItem("role");
                set((state) => ({ authStore: { ...state.authStore, role: "" } }));
                navigate("/");
            },
        }),
        {
            name: "auth-storage",
             getStorage: () => sessionStorage
        }
    )
);
