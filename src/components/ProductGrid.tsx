import { SimpleGrid } from "@chakra-ui/react";
import useProduct from "../hooks/useProduct";
import ProductCard from "./ProductCard";
import ProductCardContainer from "./ProductCardContainer";

const ProductGrid = () => {
  const products = useProduct();

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={6}
      padding="10px"
    >
      {products.map((prod) => (
        <ProductCardContainer key={prod.productId}>
          <ProductCard product={prod} />
        </ProductCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default ProductGrid;
