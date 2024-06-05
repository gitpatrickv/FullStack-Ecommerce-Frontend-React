export default interface Order{
    orderId: string;
    quantity: number;
    price: number;
    totalAmount: number;
    storeName: string;
    productName: string;
    photoUrl: string;
    paymentMethod: string;
    orderStatus: string;
}