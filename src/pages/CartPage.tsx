import { Box, Card, CardBody, Spinner } from "@chakra-ui/react";
import CartFooter from "../components/Cart/CartFooter";
import CartHeader from "../components/Cart/CartHeader";
import CartItem from "../components/Cart/CartItem";
import Cart from "../entities/Cart";
import useCartTotal from "../hooks/useCartTotal";
import useCarts from "../hooks/useCarts";
import useDeleteAllCarts from "../hooks/useDeleteAllCarts";
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
  const { mutate: deleteAllCarts } = useDeleteAllCarts();
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

  const handleDeleteAllCart = () => {
    deleteAllCarts(
      { jwtToken: jwtToken || "" },
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
    <Box>
      <CartHeader isChecked={isChecked} onFilterAll={handleFilterAll} />
      {groupedCarts &&
        Object.entries(groupedCarts).map(([storeName, storeCarts]) => {
          return (
            <Box pt="10px" key={storeName}>
              <Card maxW={{ base: "100%", lg: "70%" }} margin="auto">
                <CardBody>
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
      />
    </Box>
  );
};
export default CartPage;
