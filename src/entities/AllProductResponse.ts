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
    storePhotoUrl: string;
    listed: boolean;
}

interface PageResponse {
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

interface StoreInfo {
    storeName: string;
    storePhotoUrl: string;
    online: boolean;
}

export default interface AllProductsResponse {
    allProductModels: AllProductModels[];
    pageResponse: PageResponse;
}

export default interface StoreResponse {
    allProductModels: AllProductModels[];
    storeInfo: StoreInfo;
    pageResponse: PageResponse;
}