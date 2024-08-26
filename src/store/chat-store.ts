import { create } from "zustand";
import { MessageModel } from "../entities/Message";

interface ChatStore {
  isChatMinimized: boolean;
  // toggleChat: () => void;
  minimizeChat: () => void;
  maximizeChat: () => void;
  chatId: number | null;
  setChatId: (id: number | null) => void;
  // clearChatId: () => void;
  messages: MessageModel[];
  setMessages: (messages: MessageModel[]) => void;
  addMessage: (message: MessageModel) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isChatMinimized: true,
  chatId: null,
  // toggleChat: () => set((state) => ({ isChatMinimized: !state.isChatMinimized })),
  minimizeChat: () => set({ isChatMinimized: true }),
  maximizeChat: () => set({ isChatMinimized: false }),
  setChatId: (id: number | null) => set({ chatId: id }), 
  // clearChatId: () => set({ chatId: null }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({messages: []})
}));

