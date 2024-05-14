import { Box, Card, CardBody, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cart from "../../entities/Cart";

interface Props {
  cart: Cart;
}

const CartItem = ({ cart }: Props) => {
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/api/product/` + cart?.productId);
  };

  return (
    <Box>
      <Card
        maxW="70%"
        mb="20px"
        pt="30px"
        position="relative"
        margin="auto"
        mt="10px"
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
              pr="35px"
            >
              <Image
                src={cart.photoUrl}
                w={[50, 100]}
                boxSize="70px"
                onClick={handleNavigateClick}
                cursor="pointer"
              />
              <Text
                fontSize="xl"
                fontWeight="semibold"
                lineHeight="short"
                textTransform="capitalize"
                position="relative"
                left="-20px"
                onClick={handleNavigateClick}
                cursor="pointer"
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
