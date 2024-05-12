import { Spinner } from "@chakra-ui/react";
import CartItem from "../components/Cart/CartItem";
import useCarts from "../hooks/useCarts";
import CartHeader from "../components/Cart/CartHeader";

const CartPage = () => {
  const jwtToken = localStorage.getItem("jwtToken");

  const { data, isLoading, error } = useCarts(jwtToken || "");

  if (isLoading) return <Spinner />;

  if (error || !data) throw error;

  return (
    <>
      <CartHeader />
      {data.data.map((cartItem, index) => (
        <CartItem key={index} cart={cartItem} />
      ))}
    </>
  );
};
export default CartPage;
