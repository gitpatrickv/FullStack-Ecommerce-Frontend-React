import { Box, Card, CardBody, Image, Text } from "@chakra-ui/react";
import Cart from "../entities/Cart";
import { axiosInstance } from "../services/api-client";

interface Props {
  cart: Cart;
}
const apiClient = axiosInstance;

const CartItem = ({ cart }: Props) => {
  return (
    <>
      <Card maxW="70%">
        <CardBody>
          <Image src={cart.photoUrl} />
          <Text>{cart.productName}</Text>
          <Text>TEXT</Text>
        </CardBody>
      </Card>
    </>
  );
};

export default CartItem;
