export default interface AllProductModels {
    productId: string;
    productName: string;
    price: number;
    photoUrl: string;
    favorites: boolean;
    quantity: number;
    storeId: string;
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
