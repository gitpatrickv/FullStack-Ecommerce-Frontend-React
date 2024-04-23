import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import useProductDetail from "../hooks/useProductDetail";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useProductDetail(productId!);

  if (isLoading) return <Spinner />;

  if (error || !data) throw error;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <Text>PRODUCT DETAIL PAGE</Text>
      <ProductDetail product={data} />
    </SimpleGrid>
  );
};

export default ProductDetailPage;
