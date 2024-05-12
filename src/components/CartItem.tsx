import { Box, Card, CardBody, Image, Text } from "@chakra-ui/react";
import Cart from "../entities/Cart";

interface Props {
  cart: Cart;
}

const CartItem = ({ cart }: Props) => {
  return (
    <Box>
      <Card
        maxW="70%"
        mb="20px"
        pt="30px"
        position="relative"
        margin="auto"
        mt="30px"
      >
        <CardBody>
          <Box>
            <Box
              position="absolute"
              top="15px"
              fontSize="xl"
              fontWeight="semibold"
              lineHeight="short"
              textTransform="uppercase"
            >
              <Text>{cart.shopName}</Text>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Image src={cart.photoUrl} w={[50, 100]} />
              <Text
                fontSize="xl"
                fontWeight="semibold"
                lineHeight="short"
                textTransform="capitalize"
              >
                {cart.productName}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
                {cart.quantity}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
                ₱{cart.price}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
                ₱{cart.totalAmount}
              </Text>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default CartItem;
