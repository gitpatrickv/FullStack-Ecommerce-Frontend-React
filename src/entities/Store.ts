
export default interface Store{
    storeId: string;
    storeName: string;
    storeDescription: string;
    address: string;
    contactNumber: string;
    shippingFee: number;
    email: string;
    photoUrl: string;
    productCount: number;
    orderCount: number;
    online: boolean;
}