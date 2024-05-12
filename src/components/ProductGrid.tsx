import { SimpleGrid, Spinner } from "@chakra-ui/react";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductCardContainer from "./ProductCardContainer";

const ProductGrid = () => {
  // const products = useProducts();
  const { data, isLoading, error } = useProducts();
  if (isLoading) return <Spinner />;

  if (error || !data) throw error;
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 3, lg: 3, xl: 5 }}
      spacing={6}
      padding="10px"
    >
      {data?.data.map((prod) => (
        <ProductCardContainer key={prod.productId}>
          <ProductCard product={prod} />
        </ProductCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default ProductGrid;
