export interface MessageModel {
    messageId: number;
    sender: string;
    content: string;
    timestamp: string;
    chatId: number;
}

export default interface Message {
    messageModelList: MessageModel[];
}