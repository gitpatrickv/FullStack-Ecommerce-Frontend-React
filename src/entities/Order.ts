
export default interface OrderItem{
 id:number;
    quantity: number;
price: number;
    storeName: string;
productName: string;
photoUrl: string;
orderStatus: string;
totalAmount: number;
orderId: string;
}

export default interface Order{
    orderId: string;
    // quantity: number;
    // price: number;
    totalAmount: number;
    // storeName: string;
    // productName: string;
    // photoUrl: string;
    paymentMethod: string;
    // orderStatus: string;
    deliveryAddress: string;
    fullName: string;
    contactNumber: string;
    orderItem: OrderItem[];
}

