import Inventory from "./Inventory";

export default interface Product {
    photoUrl: string;
    productId: string;
    shopName: string;
    productName: string;
    productDescription: string;
    // inventory: Inventory[];
    // productImage: string[];
    price: number;
    quantity: number;
}
