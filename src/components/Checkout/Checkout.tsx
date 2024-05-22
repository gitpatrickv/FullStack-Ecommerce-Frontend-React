import { Box, Divider, HStack, Image, Text } from "@chakra-ui/react";
import Cart from "../../entities/Cart";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  cart: Cart;
}

const Checkout = ({ cart }: Props) => {
  return (
    <Box>
      <Box position="absolute" top="10px" left="20px">
        <Text
          fontSize={["sm", "md"]}
          fontWeight="semibold"
          textTransform="uppercase"
        >
          {cart.storeName}
        </Text>
        <Divider w="150px" position="relative" pt="3px" />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pt="25px"
        flexWrap="wrap"
      >
        <Box display="flex" alignItems="center">
          <Image
            src={cart.photoUrl}
            w={{ base: "20px", lg: "50px" }}
            boxSize={{ base: "20px", lg: "50px" }}
          ></Image>
          <Text
            fontSize={["sm", "md"]}
            fontWeight="semibold"
            pl="10px"
            textTransform="capitalize"
            isTruncated
            maxW={{ base: "70px", md: "100px", lg: "150px", xl: "250px" }}
          >
            {cart.productName}
          </Text>
        </Box>
        <HStack
          spacing={{
            base: "40px",
            sm: "0px",
            md: "130px",
            lg: "80px",
            xl: "250px",
          }}
          display="flex"
          flexWrap="wrap"
        >
          <Text fontSize={["sm", "md"]} fontWeight="semibold">
            {formatCurrency(cart.price)}
          </Text>
          <Text fontSize={["sm", "md"]} fontWeight="semibold">
            {cart.quantity}
          </Text>
          <Text fontSize={["sm", "md"]} fontWeight="semibold" color="orange">
            {formatCurrency(cart.totalAmount)}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default Checkout;
