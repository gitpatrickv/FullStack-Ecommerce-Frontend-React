import {
  Box,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CartFooter from "../components/Cart/CartFooter";
import CartHeader from "../components/Cart/CartHeader";
import CartItem from "../components/Cart/CartItem";
import Cart from "../entities/Cart";
import useCartTotal from "../hooks/useCartTotal";
import useCarts from "../hooks/useCarts";
import useCheckout from "../hooks/useCheckout";
import useDeleteAllCarts from "../hooks/useDeleteAllCarts";
import useFilterAllCarts from "../hooks/useFilterAllCarts";
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
  const { mutate: filterAllCart } = useFilterAllCarts();
  const { mutate: deleteAllCarts } = useDeleteAllCarts();
  const { data: checkout, refetch: refetchCheckout } = useCheckout(jwtToken);
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

  return (
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
            onDeleteAll={handleDeleteAllCart}
            onFilterAll={handleFilterAll}
            onCheckout={handleNavigateCheckoutClick}
          />
        </Box>
      </GridItem>
    </Grid>
  );
};
export default CartPage;
