import Inventory from "./Inventory";

export default interface Product {
    photoUrl: string;
    productId: string;
    storeName: string;
    productName: string;
    productDescription: string;
    productImage: string[];
    price: number;
    quantity: number;
    storeId: string;
    inventoryModels: Inventory[];
    inventoryId: number;
    categoryId: string;
}
