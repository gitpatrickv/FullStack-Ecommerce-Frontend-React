import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Cart from "../../entities/Cart";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  cart: Cart;
}

const Checkout = ({ cart }: Props) => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  return (
    <Grid
      templateColumns="1.3fr 0.7fr 0.7fr 0.7fr"
      templateAreas={`
  "content1 content2 content3 content4"
`}
      alignItems="center"
    >
      <GridItem area="content1">
        <Box display="flex" alignItems="center" mt="10px">
          <Image
            src={cart.photoUrl}
            w={{ base: "30px", md: "60px", lg: "80px" }}
            h={{ base: "30px", md: "40px", lg: "60px" }}
            border="1px solid"
          />
          <Box display="flex" flexDirection="column">
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              pl="10px"
              textTransform="capitalize"
            >
              {cart.productName}
            </Text>
            {cart.colors || cart.sizes ? (
              <Text
                fontSize="sm"
                fontWeight="semibold"
                textTransform="capitalize"
                cursor="pointer"
                pl="10px"
                color="gray.500"
              >
                Variations: {cart.colors},{cart.sizes}
              </Text>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </GridItem>
      <GridItem area="content2">
        <Text fontSize={fontSize} fontWeight="semibold" textAlign="center">
          {formatCurrency(cart.price)}
        </Text>
      </GridItem>
      <GridItem area="content3">
        <Text fontSize={fontSize} fontWeight="semibold" textAlign="center">
          {cart.quantity}
        </Text>
      </GridItem>
      <GridItem area="content4" textAlign="end">
        <Text fontSize={fontSize} fontWeight="semibold" color="orange.400">
          {formatCurrency(cart.totalAmount)}
        </Text>
      </GridItem>
    </Grid>
  );
};

export default Checkout;
