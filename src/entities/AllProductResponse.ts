import Inventory from "./Inventory";

export default interface AllProductModels {
    productId: string;
    productName: string;
    productDescription: string;
    price: number;
    photoUrl: string;
    favorites: boolean;
    quantity: number;
    storeId: string;
    storeName: string;
    categoryId: string;
    categoryName: string;
    inventoryModels: Inventory[];
    productSold: number;
}

interface PageResponse {
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export default interface AllProductsResponse {
    allProductModels: AllProductModels[];
    pageResponse: PageResponse;
}
