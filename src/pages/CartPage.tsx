import { Spinner } from "@chakra-ui/react";
import CartFooter from "../components/Cart/CartFooter";
import CartHeader from "../components/Cart/CartHeader";
import CartItem from "../components/Cart/CartItem";
import useCartTotal from "../hooks/useCartTotal";
import useCarts from "../hooks/useCarts";

const CartPage = () => {
  const jwtToken = localStorage.getItem("jwtToken");

  const { data, isLoading, error } = useCarts(jwtToken || "");
  const { data: total } = useCartTotal(jwtToken || "");

  if (isLoading) return <Spinner />;

  if (error || !data) throw error;

  return (
    <>
      <CartHeader />
      {data?.data.map((cartItem, index) => (
        <CartItem key={index} cart={cartItem} />
      ))}
      <CartFooter cartTotal={total?.cartTotal ?? 0} />
    </>
  );
};
export default CartPage;
