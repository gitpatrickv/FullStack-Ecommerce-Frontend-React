import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CartFooter from "../components/Cart/CartFooter";
import CartHeader from "../components/Cart/CartHeader";
import CartItem from "../components/Cart/CartItem";
import Cart from "../entities/Cart";
import useAddToFavoritesByFilter from "../hooks/useAddToFavoritesByFilter";
import useCartTotal from "../hooks/useCartTotal";
import useCarts from "../hooks/useCarts";
import useCheckout from "../hooks/useCheckout";
import useDeleteAllCarts from "../hooks/useDeleteAllCarts";
import useFilterAllCarts from "../hooks/useFilterAllCarts";
import useGetAllFavorites from "../hooks/useGetAllFavorites";
import { useAuthQueryStore } from "../store/auth-store";
const CartPage = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

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
      console.log("select an item");
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
      if (!acc[cart.storeName]) {
        acc[cart.storeName] = [];
      }
      acc[cart.storeName].push(cart);
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
              <Button
                mt="20px"
                _hover={{ color: "orange.400" }}
                onClick={handleNavigateClick}
              >
                Go Shopping Now
              </Button>
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
                Object.entries(groupedCarts).map(([storeName, storeCarts]) => {
                  return (
                    <Box pt="5px" key={storeName}>
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
                            {storeName}
                          </Text>
                          <Divider mt={2} mb={2} />
                          {storeCarts.map((cart) => (
                            <CartItem
                              key={cart.cartId}
                              cart={cart}
                              refetchCarts={refetchCarts}
                              isChecked={isChecked}
                            />
                          ))}
                        </CardBody>
                      </Card>
                    </Box>
                  );
                })}
              <CartFooter
                cartTotal={cartTotal?.cartTotal ?? 0}
                cartItem={cartTotal?.cartItems ?? 0}
                qty={cartTotal?.qty ?? 0}
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
