import {
  Box,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CartFooter from "../../components/Cart/CartFooter";
import CartHeader from "../../components/Cart/CartHeader";
import CartItem from "../../components/Cart/CartItem";
import Cart from "../../entities/Cart";
import useAddToFavoritesByFilter from "../../hooks/user/useAddToFavoritesByFilter";
import useCartTotal from "../../hooks/user/useCartTotal";
import useCarts from "../../hooks/user/useCarts";
import useCheckout from "../../hooks/user/useCheckout";
import useDeleteAllCarts from "../../hooks/user/useDeleteAllCarts";
import useFilterAllCarts from "../../hooks/user/useFilterAllCarts";
import useGetAllFavorites from "../../hooks/user/useGetAllFavorites";
import { useAuthQueryStore } from "../../store/auth-store";

const CartPage = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const toast = useToast();
  const {
    data: carts,
    isLoading,
    error,
    refetch: refetchCarts,
  } = useCarts(jwtToken);
  const { data: cartTotal, refetch: refetchTotal } = useCartTotal(jwtToken);
  const { data: checkout, refetch: refetchCheckout } = useCheckout(jwtToken);
  const { refetch: refetchFavorites } = useGetAllFavorites();
  const { mutate: filterAllCart } = useFilterAllCarts();
  const { mutate: deleteAllCarts } = useDeleteAllCarts();
  const { mutate: addToFavoritesByFilter } = useAddToFavoritesByFilter();
  const navigate = useNavigate();
  if (isLoading) return <Spinner />;
  if (error || !carts) throw error;

  const handleNavigateCheckoutClick = () => {
    if (cartTotal?.cartTotal === 0) {
      toast({
        position: "top",
        title: "Please select an item",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    refetchCheckout();
    navigate("/checkout");
  };

  const handleFilterAll = () => {
    filterAllCart(
      { jwtToken: jwtToken },
      {
        onSuccess: () => {
          refetchCarts();
          refetchTotal();
        },
      }
    );
  };

  const handleDeleteAllCart = () => {
    deleteAllCarts(
      { jwtToken: jwtToken },
      {
        onSuccess: () => {
          refetchTotal();
          refetchCarts();
        },
      }
    );
  };

  const handleAddToFavorites = () => {
    addToFavoritesByFilter(
      { jwtToken: jwtToken },
      {
        onSuccess: () => {
          refetchCarts();
          refetchTotal();
          refetchFavorites();
        },
      }
    );
  };

  const handleNavigateClick = () => {
    navigate("/daily_discover");
  };

  const groupedCarts = carts?.data.reduce(
    (acc: Record<string, Cart[]>, cart: Cart) => {
      if (!acc[cart.storeId]) {
        acc[cart.storeId] = [];
      }
      acc[cart.storeId].push(cart);
      return acc;
    },
    {}
  );

  const isChecked = carts?.data.every((cart) => cart.filter);
  const isSomeChecked = carts?.data.some((cart) => cart.filter);

  return (
    <>
      {cartTotal?.cartItems === 0 ? (
        <Grid
          templateAreas={{
            base: `"main"`,
            lg: ` " asideLeft main asideRight" `,
          }}
          templateColumns={{
            base: "1fr",
            lg: "0.2fr 1fr 0.2fr",
          }}
        >
          <GridItem area="main">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              mt="150px"
            >
              <FaCartPlus size="100px" />
              <Text mt="20px" fontSize="large" whiteSpace="nowrap">
                Your shopping cart is empty
              </Text>

              <Box
                mt="20px"
                height="50px"
                width="300px"
                border="1px solid"
                borderColor="gray.600"
                textAlign="center"
                cursor="pointer"
                userSelect="none"
                _hover={{
                  borderColor: "orange.500",
                  transform: "scale(1.03)",
                  transition: "transform .15s ease-in",
                }}
                onClick={handleNavigateClick}
              >
                <Text fontSize="xl" position="relative" top="8px">
                  Go Shopping Now
                </Text>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      ) : (
        <Grid
          templateAreas={{
            base: `"main"`,
            lg: ` " asideLeft main asideRight" `,
          }}
          templateColumns={{
            base: "1fr",
            lg: "200px 1fr 200px",
          }}
        >
          <GridItem area="main">
            <Box>
              <CartHeader isChecked={isChecked} onFilterAll={handleFilterAll} />
              {groupedCarts &&
                Object.entries(groupedCarts).map(([storeId, storeCarts]) => {
                  return (
                    <Box pt="5px" key={storeId}>
                      <Card maxW="100%" margin="auto">
                        <CardBody>
                          <Text
                            fontSize={{
                              base: "sm",
                              md: "md",
                              lg: "lg",
                              xl: "xl",
                            }}
                            fontWeight="bold"
                            textTransform="uppercase"
                            position="relative"
                            left="52px"
                            top="-5px"
                          >
                            {storeCarts[0].storeName}
                          </Text>
                          <Divider mt={2} mb={2} />
                          {storeCarts.map((cart) => (
                            <CartItem
                              key={cart.cartId}
                              cart={cart}
                              refetchCarts={refetchCarts}
                            />
                          ))}
                        </CardBody>
                      </Card>
                    </Box>
                  );
                })}
              <CartFooter
                cartTotal={cartTotal?.cartTotal ?? 0}
                qty={cartTotal?.qty ?? 0}
                numberOfFilteredProduct={
                  cartTotal?.numberOfProductFiltered ?? 0
                }
                cartItem={cartTotal?.cartItems ?? 0}
                isChecked={isChecked}
                isSomeChecked={isSomeChecked}
                onDeleteAll={handleDeleteAllCart}
                onFilterAll={handleFilterAll}
                onCheckout={handleNavigateCheckoutClick}
                onAddToFavorites={handleAddToFavorites}
              />
            </Box>
          </GridItem>
        </Grid>
      )}
    </>
  );
};
export default CartPage;
