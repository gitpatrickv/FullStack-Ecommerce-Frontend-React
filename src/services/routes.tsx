import { createBrowserRouter } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";
import SellerPage from "../pages/seller/SellerPage";
import AccountProfilePage from "../pages/user/AccountProfilePage";
import AllOrderPage from "../pages/user/AllOrderPage";
import CancelledPage from "../pages/user/CancelledPage";
import CartPage from "../pages/user/CartPage";
import ChangePasswordPage from "../pages/user/ChangePasswordPage";
import CheckoutPage from "../pages/user/CheckoutPage";
import CompletedPage from "../pages/user/CompletedPage";
import DailyDiscoverPage from "../pages/user/DailyDiscoverPage";
import ErrorPage from "../pages/user/ErrorPage";
import FavoritePage from "../pages/user/FavoritePage";
import HomePage from "../pages/user/HomePage";
import Layout from "../pages/user/Layout";
import LoginPage from "../pages/user/LoginPage";
import MyPurchasePage from "../pages/user/MyPurchasePage";
import ProductDetailPage from "../pages/user/ProductDetailPage";
import RegisterPage from "../pages/user/RegisterPage";
import { SearchPage } from "../pages/user/SearchPage";
import StorePage from "../pages/user/StorePage";
import ToPayPage from "../pages/user/ToPayPage";
import ToReceivePage from "../pages/user/ToReceivePage";
import ToShipPage from "../pages/user/ToShipPage";
import UserPage from "../pages/user/UserPage";
import Dashboard from "../components/Dashboard/seller/Dashboard";
import NewProductPage from "../pages/seller/NewProductPage";

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
    children: [
      { index: true, element: <Dashboard /> },
      { path: "product/new", element: <NewProductPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
