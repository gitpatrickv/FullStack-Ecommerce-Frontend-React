import { SimpleGrid } from "@chakra-ui/react";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductCardContainer from "./ProductCardContainer";

const ProductGrid = () => {
  const products = useProducts();

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 3, lg: 3, xl: 5 }}
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
