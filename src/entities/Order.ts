
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
    orderTotalAmount: number;
    active:boolean;
    storeId: string;
}

export default interface Order{
    orderId: string;
    totalAmount: number;
    paymentMethod: string;
    deliveryAddress: string;
    fullName: string;
    contactNumber: string;
    // orderItem: OrderItem[];
}

