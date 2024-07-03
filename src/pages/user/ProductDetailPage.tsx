import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProductDetail from "../../components/Product/ProductDetail";
import useProductDetail from "../../hooks/user/useProductDetail";

const ProductDetailPage = () => {
  const { productId } = useParams();

  const { data, isLoading, error } = useProductDetail(productId!);

  if (isLoading) return <Spinner />;

  if (error || !data) throw error;

  return (
    <Grid
      templateColumns="200px 1fr 200px"
      templateAreas={`
  "sidebar content1 sidebar1"
`}
    >
      <GridItem area="content1">
        <ProductDetail product={data} />
      </GridItem>
    </Grid>
  );
};

export default ProductDetailPage;
