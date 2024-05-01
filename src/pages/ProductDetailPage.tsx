import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import useProductDetail from "../hooks/useProductDetail";

const ProductDetailPage = () => {
  const { productId } = useParams();

  const { data, isLoading, error } = useProductDetail(productId!);

  if (isLoading) return <Spinner />;

  if (error || !data) throw error;

  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: ` " aside main" `,
      }}
      templateColumns={{
        base: "1fr",
        lg: "300px 1fr",
      }}
    >
      <GridItem area="main">
        <ProductDetail product={data} />
      </GridItem>
    </Grid>
  );
};

export default ProductDetailPage;

// <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={5}>
// <Text>PRODUCT DETAIL PAGE</Text>
// <ProductDetail product={data} />
// </Grid>
