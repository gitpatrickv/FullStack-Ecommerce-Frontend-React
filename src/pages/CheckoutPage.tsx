import Checkout from "../components/Checkout/Checkout";
import OrderTotal from "../components/Checkout/OrderTotal";
import Payment from "../components/Checkout/Payment";
import ProductOrderedHeader from "../components/Checkout/ProductOrderedHeader";
import UserInfo from "../components/Checkout/UserInfo";

const CheckoutPage = () => {
  return (
    <>
      <UserInfo />
      <ProductOrderedHeader />
      <Checkout />
      <OrderTotal />
      <Payment />
    </>
  );
};

export default CheckoutPage;
