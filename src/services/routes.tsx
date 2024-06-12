import { createBrowserRouter } from "react-router-dom";
import AccountProfilePage from "../pages/AccountProfilePage";
import AdminPage from "../pages/AdminPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import DailyDiscoverPage from "../pages/DailyDiscoverPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import LoginPage from "../pages/LoginPage";
import MyPurchasePage from "../pages/MyPurchasePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import RegisterPage from "../pages/RegisterPage";
import { SearchPage } from "../pages/SearchPage";
import SellerPage from "../pages/SellerPage";
import UserPage from "../pages/UserPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import FavoritePage from "../pages/FavoritePage";
import AllOrderPage from "../pages/AllOrderPage";
import ToPayPage from "../pages/ToPayPage";
import ToShipPage from "../pages/ToShipPage";
import ToReceivePage from "../pages/ToReceivePage";
import CompletedPage from "../pages/CompletedPage";
import CancelledPage from "../pages/CancelledPage";
import StorePage from "../pages/StorePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: `/api/product/:productId`, element: <ProductDetailPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/daily_discover", element: <DailyDiscoverPage /> },
      { path: "/store/:storeId", element: <StorePage /> },
      {
        path: "user",
        element: <UserPage />,
        children: [
          { path: "account/profile", element: <AccountProfilePage /> },
          { path: "account/password", element: <ChangePasswordPage /> },
          { path: "favorites", element: <FavoritePage /> },
          {
            path: "purchase",
            element: <MyPurchasePage />,
            children: [
              { path: "order/all", element: <AllOrderPage /> },
              { path: "order/to-pay", element: <ToPayPage /> },
              { path: "order/to-ship", element: <ToShipPage /> },
              { path: "order/to-receive", element: <ToReceivePage /> },
              { path: "order/completed", element: <CompletedPage /> },
              { path: "order/cancelled", element: <CancelledPage /> },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/seller",
    element: <SellerPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
