import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import AllProductModels from "../../../entities/AllProductResponse";
import { formatCurrency } from "../../../utilities/formatCurrency";
import useDeleteProduct from "../../../hooks/seller/useDeleteProduct";
import { useAuthQueryStore } from "../../../store/auth-store";

interface Props {
  product: AllProductModels;
  refetchProducts: () => void;
}

const ProductsList = ({ product, refetchProducts }: Props) => {
  const fontSize = useBreakpointValue({ base: "sm", xl: "xl" });
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDeleteProductClick = () => {
    deleteProduct(
      {
        jwtToken: jwtToken,
        productId: product.productId,
      },
      {
        onSuccess: () => {
          refetchProducts();
        },
      }
    );
  };

  return (
    <Grid
      templateColumns="1fr 0.3fr 0.3fr 0.3fr 0.3fr"
      templateAreas={`
  "content1 content2 content3 content4 content5"
`}
      gap={4}
      p={3}
    >
      <GridItem area="content1">
        <Box display="flex" alignItems="center">
          <Image
            src={product.photoUrl}
            w={{ base: "40px", md: "80px", lg: "100px" }}
            h={{ base: "40px", md: "60px", lg: "80px" }}
            cursor="pointer"
          />
          <Text
            fontSize={fontSize}
            fontWeight="semibold"
            textTransform="capitalize"
            cursor="pointer"
            pl="20px"
          >
            {product.productName}
          </Text>
        </Box>
      </GridItem>
      <GridItem
        area="content2"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={fontSize} fontWeight="semibold">
          0
        </Text>
      </GridItem>
      <GridItem
        area="content3"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={fontSize} fontWeight="semibold">
          {formatCurrency(product.price)}
        </Text>
      </GridItem>
      <GridItem
        area="content4"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={fontSize} fontWeight="semibold">
          {product.quantity}
        </Text>
      </GridItem>
      <GridItem
        area="content5"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Box display="flex" flexDirection="column" justifyContent="flex-end">
          <Button
            cursor="pointer"
            fontSize={fontSize}
            fontWeight="semibold"
            color="orange.400"
            mb="5px"
          >
            Update
          </Button>
          <Button
            cursor="pointer"
            fontSize={fontSize}
            fontWeight="semibold"
            color="orange.400"
            onClick={handleDeleteProductClick}
          >
            Delete
          </Button>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ProductsList;
