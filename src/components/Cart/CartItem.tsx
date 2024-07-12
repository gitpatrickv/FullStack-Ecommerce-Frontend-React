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
}

const CartItem = ({ cart, refetchCarts }: Props) => {
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
  const [isCheck, setIsCheck] = useState<boolean>(cart.filter);
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
    setIsCheck(cart.filter);
  }, [cart.filter]);

  const handleClickDecrement = () => {
    decrementQuantity(
      {
        inventoryId: cart.inventoryId,
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
        inventoryId: cart.inventoryId,
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
            isChecked={isCheck}
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
              border="1px solid"
            />
            <Box display="flex" flexDirection="column">
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
              {cart.colors || cart.sizes ? (
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  textTransform="capitalize"
                  onClick={handleNavigateClick}
                  cursor="pointer"
                  pl="20px"
                  color="gray.500"
                >
                  Variation: {cart.colors},{cart.sizes}
                </Text>
              ) : (
                ""
              )}
            </Box>
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
        <Box display="flex" alignItems="center" flexDirection="column">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box
              width="40px"
              height="40px"
              border="1px solid"
              borderColor="gray.600"
              textAlign="center"
              cursor="pointer"
              onClick={cart.quantity > 1 ? handleClickDecrement : onOpen}
              _hover={{ color: "orange.400" }}
              userSelect="none"
            >
              <Text fontSize="x-large" position="relative" bottom="2px">
                -
              </Text>
            </Box>
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
                      bg="red.500"
                      _hover={{ bg: "red.600" }}
                      onClick={handleClickDecrement}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
            <Box
              width="50px"
              height="40px"
              border="1px solid "
              borderColor="gray.600"
              textAlign="center"
            >
              <Text mt="5px" fontSize="lg" fontWeight="semibold">
                {cart.quantity}
              </Text>
            </Box>
            <Box
              width="40px"
              height="40px"
              border="1px solid"
              borderColor="gray.600"
              textAlign="center"
              cursor={
                cart.stockRemaining === cart.quantity
                  ? "not-allowed"
                  : "pointer"
              }
              onClick={handleClickIncrement}
              _hover={{ color: "orange.400" }}
              userSelect="none"
            >
              <Text fontSize="x-large" position="relative" bottom="2px">
                +
              </Text>
            </Box>
          </Box>
          {cart.stockRemaining === cart.quantity ? (
            <Text color="red" userSelect="none">
              {cart.stockRemaining} item(s) left
            </Text>
          ) : (
            ""
          )}
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
