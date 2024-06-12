import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Image,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../../entities/Cart";
import useCartTotal from "../../hooks/user/useCartTotal";
import useDecrementQuantity from "../../hooks/user/useDecrementQuantity";
import useDeleteCart from "../../hooks/user/useDeleteCart";
import useFilterByStoreName from "../../hooks/user/useFilterByStoreName";
import useFilterCart from "../../hooks/user/useFilterCart";
import useIncrementQuantity from "../../hooks/user/useIncrementQuantity";
import { useAuthQueryStore } from "../../store/auth-store";
import useProductQueryStore from "../../store/product-store";
import { formatCurrency } from "../../utilities/formatCurrency";

export interface Props {
  cart: Cart;
  refetchCarts: () => void;
  isChecked: boolean;
}

const CartItem = ({ cart, refetchCarts, isChecked }: Props) => {
  const reset = useProductQueryStore((state) => state.reset);
  const navigate = useNavigate();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const toast = useToast();
  const { mutate: deleteCart } = useDeleteCart();
  const { mutate: decrementQuantity } = useDecrementQuantity();
  const { mutate: incrementQuantity } = useIncrementQuantity();
  const { mutate: filterCart } = useFilterCart();
  const { mutate: filterStoreCart } = useFilterByStoreName();
  const { refetch: refetchTotal } = useCartTotal(jwtToken);
  const [isFiltered, setIsFiltered] = useState<boolean>(cart.filter);
  const [isCheck, setIsCheck] = useState<boolean>(isChecked);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const checkboxSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const buttonSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });
  const fontSize = useBreakpointValue({ base: "sm", xl: "xl" });
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
        jwtToken: jwtToken,
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
        jwtToken: jwtToken,
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
      { jwtToken: jwtToken, cartId: cart.cartId },
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
      { cartId: cart.cartId, jwtToken: jwtToken },
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
      { storeName: cart.storeName, jwtToken: jwtToken },
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
    <Grid
      templateColumns="1fr 0.5fr 0.5fr 0.5fr 0.5fr"
      templateAreas={`
      "content1 content2 content3 content4 content5"
    `}
      gap={4}
      p={3}
    >
      <GridItem area="content1">
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Checkbox
            size={checkboxSize}
            colorScheme="green"
            position="absolute"
            top="20px"
            left="32px"
            isChecked={isFiltered}
            onChange={handleStoreFilterChange}
          />
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
              w={{ base: "40px", md: "80px", lg: "100px" }}
              h={{ base: "40px", md: "60px", lg: "80px" }}
              onClick={handleNavigateClick}
              cursor="pointer"
            />
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              textTransform="capitalize"
              onClick={handleNavigateClick}
              cursor="pointer"
              pl="20px"
            >
              {cart.productName}
            </Text>
          </Box>
        </Box>
      </GridItem>
      <GridItem
        area="content2"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={fontSize} fontWeight="semibold">
          {formatCurrency(cart.price)}
        </Text>
      </GridItem>
      <GridItem
        area="content3"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex" alignItems="center">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              position="relative"
              right="10px"
              onClick={cart.quantity > 1 ? handleClickDecrement : onOpen}
              size={buttonSize}
              _hover={{ color: "orange.400" }}
            >
              -
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isCentered
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    <Text color="orange.400" fontSize="large">
                      Do you want to remove this item?
                    </Text>
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    <Text>{cart.productName}</Text>
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={handleClickDecrement}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
            <Text fontSize={fontSize} fontWeight="semibold">
              {cart.quantity}
            </Text>
            <Button
              position="relative"
              left="10px"
              onClick={handleClickIncrement}
              size={buttonSize}
              _hover={{ color: "orange.400" }}
            >
              +
            </Button>
          </Box>
        </Box>
      </GridItem>
      <GridItem
        area="content4"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={fontSize} fontWeight="semibold" color="orange.400">
          {formatCurrency(cart.totalAmount)}
        </Text>
      </GridItem>
      <GridItem
        area="content5"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button
          onClick={handleDeleteCart}
          size={buttonSize}
          _hover={{ color: "orange.400" }}
        >
          <Text fontSize={fontSize}>Delete</Text>
        </Button>
      </GridItem>
    </Grid>
  );
};

export default CartItem;
