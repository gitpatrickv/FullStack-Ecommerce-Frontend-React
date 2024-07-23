import Inventory from "./Inventory";

export default interface Product {
    photoUrl: string;
    productId: string;
    storeName: string;
    productName: string;
    productDescription: string;
    productImage: string[];
    storeId: string;
    inventoryModels: Inventory[];
    inventoryId: number;
    categoryId: string;
    productSold: number;
    storePhotoUrl: string;
    listed: boolean;
    suspended: boolean;
}
