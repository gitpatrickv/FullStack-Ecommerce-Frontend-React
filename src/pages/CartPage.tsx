import { Box, Card, CardBody, Spinner } from "@chakra-ui/react";
import CartFooter from "../components/Cart/CartFooter";
import CartHeader from "../components/Cart/CartHeader";
import CartItem from "../components/Cart/CartItem";
import Cart from "../entities/Cart";
import useCartTotal from "../hooks/useCartTotal";
import useCarts from "../hooks/useCarts";
import useFilterAllCarts from "../hooks/useFilterAllCarts";

const CartPage = () => {
  const jwtToken = localStorage.getItem("jwtToken");

  const {
    data: carts,
    isLoading,
    error,
    refetch: refetchCarts,
  } = useCarts(jwtToken || "");
  const { data: cartTotal, refetch: refetchTotal } = useCartTotal(
    jwtToken || ""
  );
  const { mutate: filterAllCart } = useFilterAllCarts();
  if (isLoading) return <Spinner />;
  if (error || !carts) throw error;

  const handleFilterAll = () => {
    filterAllCart(
      { jwtToken: jwtToken || "" },
      {
        onSuccess: () => {
          refetchCarts();
          refetchTotal();
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

  return (
    <>
      <CartHeader
        isChecked={carts?.data.every((cart) => cart.filter)}
        onFilterAll={handleFilterAll}
      />
      {groupedCarts &&
        Object.entries(groupedCarts).map(([storeName, storeCarts]) => {
          return (
            <Box pt="10px">
              <Card
                key={storeName}
                maxW="70%"
                position="relative"
                margin="auto"
              >
                <CardBody>
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
      <CartFooter cartTotal={cartTotal?.cartTotal ?? 0} />
    </>
  );
};
export default CartPage;
