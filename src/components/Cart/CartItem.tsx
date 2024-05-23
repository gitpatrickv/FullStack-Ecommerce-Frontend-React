import {
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Image,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../../entities/Cart";
import useCartTotal from "../../hooks/useCartTotal";
import useDecrementQuantity from "../../hooks/useDecrementQuantity";
import useDeleteCart from "../../hooks/useDeleteCart";
import useFilterByStoreName from "../../hooks/useFilterByStoreName";
import useFilterCart from "../../hooks/useFilterCart";
import useIncrementQuantity from "../../hooks/useIncrementQuantity";
import useProductQueryStore from "../../store/product-store";
import { formatCurrency } from "../../utilities/formatCurrency";

export interface Props {
  cart: Cart;
  refetchCarts: () => void;
  isChecked: boolean;
}
const jwtToken = localStorage.getItem("jwtToken");

const CartItem = ({ cart, refetchCarts, isChecked }: Props) => {
  const reset = useProductQueryStore((state) => state.reset);
  const navigate = useNavigate();
  const toast = useToast();
  const { mutate: deleteCart } = useDeleteCart();
  const { mutate: decrementQuantity } = useDecrementQuantity();
  const { mutate: incrementQuantity } = useIncrementQuantity();
  const { mutate: filterCart } = useFilterCart();
  const { mutate: filterStoreCart } = useFilterByStoreName();
  const { refetch: refetchTotal } = useCartTotal(jwtToken || "");
  const [isFiltered, setIsFiltered] = useState<boolean>(cart.filter);
  const [isCheck, setIsCheck] = useState<boolean>(isChecked);
  const checkboxSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const handleNavigateClick = () => {
    navigate(`/api/product/` + cart?.productId);
    reset();
  };

  useEffect(() => {
    setIsFiltered(cart.filter);
    setIsCheck(isChecked);
  }, [cart.filter, isChecked]);

  const handleClickDecrement = () => {
    decrementQuantity(
      {
        productId: cart.productId,
        cartId: cart.cartId,
        jwtToken: jwtToken || "",
      },
      {
        onSuccess: () => {
          refetchTotal();
        },
      }
    );
  };

  const handleClickIncrement = () => {
    incrementQuantity(
      {
        productId: cart.productId,
        cartId: cart.cartId,
        jwtToken: jwtToken || "",
      },
      {
        onSuccess: () => {
          refetchTotal();
        },
      }
    );
  };

  const handleDeleteCart = () => {
    deleteCart(
      { jwtToken: jwtToken || "", cartId: cart.cartId },
      {
        onSuccess: () => {
          refetchTotal();
          refetchCarts();
        },
      }
    );
    toast({
      position: "top",
      title: "Item has been deleted from your cart",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const handleFilterChange = () => {
    filterCart(
      { cartId: cart.cartId, jwtToken: jwtToken || "" },
      {
        onSuccess: () => {
          refetchTotal();
          refetchCarts();
          setIsFiltered(!isFiltered);
        },
      }
    );
  };

  const handleStoreFilterChange = () => {
    filterStoreCart(
      { storeName: cart.storeName, jwtToken: jwtToken || "" },
      {
        onSuccess: () => {
          refetchTotal();
          refetchCarts();
          setIsCheck(!isCheck);
        },
      }
    );
  };

  return (
    <Box>
      <Box position="absolute" top="10px" left="60px">
        <Checkbox
          size={checkboxSize}
          colorScheme="green"
          position="absolute"
          top="5px"
          left="-40px"
          isChecked={isFiltered}
          onChange={handleStoreFilterChange}
        />
        <Text
          fontSize={["sm", "md", "lg", "xl"]}
          fontWeight="semibold"
          textTransform="uppercase"
        >
          {cart.storeName}
        </Text>
        <Divider w="250px" position="relative" left="-60px" pt="10px" />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt="45px"
        flexWrap="wrap"
      >
        <Box display="flex" alignItems="center">
          <Checkbox
            size={checkboxSize}
            colorScheme="green"
            pr="20px"
            isChecked={isFiltered}
            onChange={handleFilterChange}
          />
          <Image
            src={cart.photoUrl}
            w={{ base: "20px", md: "50px", lg: "100px" }}
            boxSize={{ base: "20px", md: "50px", lg: "80px" }}
            onClick={handleNavigateClick}
            cursor="pointer"
          />
          <Text
            fontSize={["sm", "md", "lg", "xl"]}
            fontWeight="semibold"
            textTransform="capitalize"
            onClick={handleNavigateClick}
            cursor="pointer"
            pl="20px"
            isTruncated
            maxW={{ base: "50px", md: "100px", lg: "120px", xl: "250px" }}
          >
            {cart.productName}
          </Text>
        </Box>
        <HStack
          spacing={{
            base: "0px",
            sm: "5px",
            md: "50px",
            lg: "60px",
            xl: "150px",
          }}
          display="flex"
          flexWrap="wrap"
        >
          <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
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
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
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
          <Text
            fontSize={["sm", "md", "lg", "xl"]}
            fontWeight="semibold"
            color="orange"
          >
            {formatCurrency(cart.totalAmount)}
          </Text>
          <Button onClick={handleDeleteCart}>Delete</Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default CartItem;
