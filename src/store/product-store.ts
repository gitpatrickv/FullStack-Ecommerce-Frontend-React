import {create} from "zustand";

interface ProductQuery {
    productId?: string;
    searchText?: string;
    count: number;
}

interface ProductQueryStore {
    productQuery: ProductQuery;
    setProductId: (productId: string) => void;
    increment: (quantity: number) => void;
    decrement: (quantity: number) => void;
}

const useProductQueryStore = create<ProductQueryStore>(set => ({
    productQuery: {count: 1},
    setProductId: (productId) => set((state) => ({ productQuery: { ...state.productQuery, productId }})),
    increment: (quantity) => set((state) => {
        if (state.productQuery.count < quantity) {
            return { productQuery: { ...state.productQuery, count: state.productQuery.count + 1 }}
        }
        return state;
    }),
    decrement: () => set((state) => {
        if (state.productQuery.count > 1) {
            return { productQuery: { ...state.productQuery, count: state.productQuery.count - 1 }}
        }
        return state;
    })
}))

export default useProductQueryStore;