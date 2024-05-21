export default interface Cart{
    cartId:string;
    photoUrl: string;
    productId: string;
    storeName: string;
    productName: string;
    price: number;
    quantity: number;
    totalAmount: number;
    filter: boolean;
    cartTotal: number;
}