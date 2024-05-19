import { Spinner } from "@chakra-ui/react";
import CartFooter from "../components/Cart/CartFooter";
import CartHeader from "../components/Cart/CartHeader";
import CartItem from "../components/Cart/CartItem";
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

  return (
    <>
      <CartHeader
        isChecked={carts?.data.every((cart) => cart.filter)}
        onFilterAll={handleFilterAll}
      />

      {carts?.data.map((cart) => (
        <CartItem key={cart.cartId} cart={cart} refetchCarts={refetchCarts} />
      ))}
      <CartFooter cartTotal={cartTotal?.cartTotal ?? 0} />
    </>
  );
};
export default CartPage;
