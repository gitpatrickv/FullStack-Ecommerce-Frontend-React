import { Box, Card, CardBody, Spinner } from "@chakra-ui/react";
import Checkout from "../components/Checkout/Checkout";
import OrderTotal from "../components/Checkout/OrderTotal";
import Payment from "../components/Checkout/Payment";
import ProductOrderedHeader from "../components/Checkout/ProductOrderedHeader";
import UserInfo from "../components/Checkout/UserInfo";
import Cart from "../entities/Cart";
import useCartTotal from "../hooks/useCartTotal";
import useCheckout from "../hooks/useCheckout";

const CheckoutPage = () => {
  const jwtToken = localStorage.getItem("jwtToken");
  const { data: carts, isLoading, error } = useCheckout(jwtToken || "");
  const { data: cartTotal } = useCartTotal(jwtToken || "");

  if (isLoading) return <Spinner />;
  if (error || !carts) throw error;

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

  return (
    <>
      <UserInfo />
      <ProductOrderedHeader />

      {groupedCarts &&
        Object.entries(groupedCarts).map(([storeName, storeCarts]) => {
          return (
            <Box pt="10px" key={storeName}>
              <Card maxW={{ base: "100%", lg: "70%" }} margin="auto">
                <CardBody>
                  {storeCarts.map((cart) => (
                    <Checkout key={cart.cartId} cart={cart} />
                  ))}
                </CardBody>
              </Card>
            </Box>
          );
        })}
      {cartTotal && (
        <OrderTotal
          cartTotal={cartTotal?.cartTotal ?? 0}
          qty={cartTotal?.qty ?? 0}
        />
      )}
      {cartTotal && <Payment cartTotal={cartTotal?.cartTotal ?? 0} />}
    </>
  );
};

export default CheckoutPage;
