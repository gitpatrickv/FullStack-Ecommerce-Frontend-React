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
import Checkout from "../components/Checkout/Checkout";
import OrderTotal from "../components/Checkout/OrderTotal";
import Payment from "../components/Checkout/Payment";
import ProductOrderedHeader from "../components/Checkout/ProductOrderedHeader";
import UserInfo from "../components/Checkout/UserInfo";
import Cart from "../entities/Cart";
import useCartTotal from "../hooks/useCartTotal";
import useCarts from "../hooks/useCarts";
import useCheckout from "../hooks/useCheckout";
import useGetOrdersByToPayStatus from "../hooks/useGetOrdersByToPayStatus";
import usePlaceOrder from "../hooks/usePlaceOrder";
import { useAuthQueryStore } from "../store/auth-store";

const CheckoutPage = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: carts, isLoading, error } = useCheckout(jwtToken);
  const { data: cartTotal, refetch: refetchTotal } = useCartTotal(jwtToken);
  const { refetch: refetchOrderByToPayStatus } =
    useGetOrdersByToPayStatus(jwtToken);
  const { refetch: refetchCarts } = useCarts(jwtToken);
  const { mutate: placeOrder } = usePlaceOrder();
  const navigate = useNavigate();
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

  const handlePlaceOrder = () => {
    placeOrder(jwtToken, {
      onSuccess: () => {
        refetchCarts();
        refetchTotal();
        refetchOrderByToPayStatus();
        navigate("/user/purchase/order/to-pay");
      },
    });
  };

  return (
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
        <UserInfo />
        <ProductOrderedHeader />

        {groupedCarts &&
          Object.entries(groupedCarts).map(([storeName, storeCarts]) => {
            return (
              <Box mt="5px" key={storeName}>
                <Card maxW="100%">
                  <CardBody>
                    <Text
                      fontSize={{
                        base: "sm",
                        md: "md",
                        lg: "lg",
                        xl: "xl",
                      }}
                      fontWeight="semibold"
                      textTransform="uppercase"
                      position="relative"
                      top="-13px"
                    >
                      {storeName}
                    </Text>
                    <Divider mt={-2} />
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
        {cartTotal && (
          <Payment
            shippingFee={cartTotal.totalShippingFee ?? 0}
            totalPayment={cartTotal.totalPayment ?? 0}
            onPlaceOrder={handlePlaceOrder}
          />
        )}
      </GridItem>
    </Grid>
  );
};

export default CheckoutPage;
