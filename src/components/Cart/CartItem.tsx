import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  HStack,
  Image,
  Text,
  useCheckbox,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cart from "../../entities/Cart";
import useDecrementQuantity from "../../hooks/useDecrementQuantity";
import useDeleteCart from "../../hooks/useDeleteCart";
import useIncrementQuantity from "../../hooks/useIncrementQuantity";
import useProductQueryStore from "../../store/product-store";
import { formatCurrency } from "../../utilities/formatCurrency";
import useFilterCart from "../../hooks/useFilterCart";
import { useState } from "react";

interface Props {
  cart: Cart;
}
const jwtToken = localStorage.getItem("jwtToken");

const CartItem = ({ cart }: Props) => {
  const reset = useProductQueryStore((state) => state.reset);
  const navigate = useNavigate();
  const { mutate: deleteCart } = useDeleteCart();
  const { mutate: decrementQuantity } = useDecrementQuantity();
  const { mutate: incrementQuantity } = useIncrementQuantity();
  const { mutate: filterCart, data } = useFilterCart();
  const toast = useToast();
  const [isFiltered, setIsFiltered] = useState<boolean>(cart.filter);
  const handleNavigateClick = () => {
    navigate(`/api/product/` + cart?.productId);
    reset();
  };

  const handleClickDecrement = () => {
    decrementQuantity({
      productId: cart.productId,
      cartId: cart.cartId,
      jwtToken: jwtToken || "",
    });
  };

  const handleClickIncrement = () => {
    incrementQuantity({
      productId: cart.productId,
      cartId: cart.cartId,
      jwtToken: jwtToken || "",
    });
  };

  const handleDeleteCart = () => {
    deleteCart({ jwtToken: jwtToken || "", cartId: cart.cartId });
    toast({
      position: "top",
      title: "Item has been deleted from your cart",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const handleFilterChange = () => {
    filterCart({ cartId: cart.cartId, jwtToken: jwtToken || "" });
    setIsFiltered(!isFiltered);
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
              top="5px"
              fontSize="xl"
              fontWeight="semibold"
              textTransform="uppercase"
            >
              <Text>{cart.shopName}</Text>
              <Divider w="1650px" position="relative" left="-20px" pt="3px" />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center">
                <Checkbox
                  size="lg"
                  colorScheme="green"
                  pr="20px"
                  isChecked={isFiltered}
                  onChange={handleFilterChange}
                />
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
                  textTransform="capitalize"
                  onClick={handleNavigateClick}
                  cursor="pointer"
                  pl="20px"
                >
                  {cart.productName}
                </Text>
              </Box>
              <HStack spacing="275px">
                <Text fontSize="xl" fontWeight="semibold">
                  {formatCurrency(cart.price)}
                </Text>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    position="relative"
                    right="10px"
                    onClick={handleClickDecrement}
                  >
                    -
                  </Button>
                  <Text fontSize="xl" fontWeight="semibold">
                    {cart.quantity}
                  </Text>
                  <Button
                    position="relative"
                    left="10px"
                    onClick={handleClickIncrement}
                  >
                    +
                  </Button>
                </Box>
                <Text fontSize="xl" fontWeight="semibold">
                  {formatCurrency(cart.totalAmount)}
                </Text>
                <Button onClick={handleDeleteCart}>Delete</Button>
              </HStack>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default CartItem;
