import { Box } from "@chakra-ui/react";
import ProductListHeader from "../../components/Product/seller/ProductListHeader";
import ProductsList from "../../components/Product/seller/ProductsList";

const MyProductPage = () => {
  return (
    <Box mt="5px">
      <ProductListHeader />
      <ProductsList />
    </Box>
  );
};

export default MyProductPage;
