import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import useProductDetail from "../hooks/useProductDetail";

const ProductDetailPage = () => {
  const { productId } = useParams();

  const { data, isLoading, error } = useProductDetail(productId!);

  if (isLoading) return <Spinner />;

  if (error || !data) throw error;

  return <ProductDetail product={data} />;
};

export default ProductDetailPage;
