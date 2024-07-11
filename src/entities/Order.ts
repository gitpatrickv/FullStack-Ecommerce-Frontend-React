
export default interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    storeName: string;
    productName: string;
    photoUrl: string;
    orderStatus: string;
    totalAmount: number;
    orderId: string;
    orderTotalAmount: number;
    orderStatusInfo: string;
    active: boolean;
    storeId: string;
    fullName: string;
    colors: string;
    sizes: string;
    productId: string;
    rated: boolean;
  }
  
  export interface Order {
    orderId: string;
    orderTotalAmount: number;
    paymentMethod: string;
    active: boolean;
    orderStatus: string;
    orderStatusInfo: string;
    deliveryAddress: string;
    fullName: string;
    contactNumber: string;
    orderItemModels: OrderItem[];
  }
  
  export interface OrdersResponse {
    orderModel: Order[];
  }
  

