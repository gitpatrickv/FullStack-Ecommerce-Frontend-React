export interface MessageModel {
    messageId: number;
    sender: string;
    content: string;
    timestamp: string;
    chatId: number;
}

export default interface Chat {
    chatId: number;
    storeName: string;
    storePhotoUrl: string;
    messageModelList: MessageModel[];
}