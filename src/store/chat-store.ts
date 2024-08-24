import { create } from "zustand";

interface ChatStore {
  isChatMinimized: boolean;
  // toggleChat: () => void;
  minimizeChat: () => void;
  maximizeChat: () => void;
  chatId: number | null;
  setChatId: (id: number | null) => void;
  clearChatId: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isChatMinimized: false,
  chatId: null,
  // toggleChat: () => set((state) => ({ isChatMinimized: !state.isChatMinimized })),
  minimizeChat: () => set({ isChatMinimized: true }),
  maximizeChat: () => set({ isChatMinimized: false }),
  setChatId: (id: number | null) => set({ chatId: id }), 
  clearChatId: () => set({ chatId: null }),
}));

