import { Box, Image, Text } from "@chakra-ui/react";
import Cart from "../entities/Cart";
import { axiosInstance } from "../services/api-client";

interface Props {
  cart: Cart;
}

const CartItem = ({ cart }: Props) => {
  return (
    <>
      <Box>
        <Image src={cart.photoUrl} />
        <Text>{cart.productName}</Text>
        <Text>TEXT</Text>
      </Box>
    </>
  );
};

export default CartItem;
