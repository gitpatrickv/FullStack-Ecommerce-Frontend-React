import { createBrowserRouter } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";
import AllProductsOrderPage from "../pages/seller/AllProductsOrderPage";
import CancelledOrdersPage from "../pages/seller/CancelledOrdersPage";
import CompletedOrdersPage from "../pages/seller/CompletedOrdersPage";
import DashBoardPage from "../pages/seller/DashBoardPage";
import MyProductPage from "../pages/seller/MyProductPage";
import NewProductPage from "../pages/seller/NewProductPage";
import OrderPage from "../pages/seller/OrderPage";
import PendingPage from "../pages/seller/PendingPage";
import SellerPage from "../pages/seller/SellerPage";
import ShippingPage from "../pages/seller/ShippingPage";
import ToShipOrdersPage from "../pages/seller/ToShipOrdersPage";
import UnpaidPage from "../pages/seller/UnpaidPage";
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
import MyPurchasePage from "../pages/user/MyPurchasePage";
import ProductCategoryPage from "../pages/user/ProductCategoryPage";
import ProductDetailPage from "../pages/user/ProductDetailPage";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import CreateStorePage from "../pages/seller/CreateStorePage";
import { SearchPage } from "../pages/user/SearchPage";
import StorePage from "../pages/user/StorePage";
import ToPayPage from "../pages/user/ToPayPage";
import ToReceivePage from "../pages/user/ToReceivePage";
import ToShipPage from "../pages/user/ToShipPage";
import UserPage from "../pages/user/UserPage";
import StoreInformationPage from "../pages/seller/StoreInformationPage";
import ReviewManagementPage from "../pages/seller/ReviewManagementPage";

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
        path: "/category/:categoryId",
        element: <ProductCategoryPage />,
      },
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
              { path: "order/pending", element: <PendingPage /> },
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
      { index: true, element: <DashBoardPage /> },
      {
        path: "order",
        element: <OrderPage />,
        children: [
          { path: "all/:storeId", element: <AllProductsOrderPage /> },
          { path: "pending/:storeId", element: <PendingPage /> },
          { path: "unpaid/:storeId", element: <UnpaidPage /> },
          { path: "to-ship/:storeId", element: <ToShipOrdersPage /> },
          { path: "shipping/:storeId", element: <ShippingPage /> },
          { path: "completed/:storeId", element: <CompletedOrdersPage /> },
          { path: "cancelled/:storeId", element: <CancelledOrdersPage /> },
        ],
      },
      { path: "product", element: <MyProductPage /> },
      { path: "product/new", element: <NewProductPage /> },
      { path: "shop/info", element: <StoreInformationPage /> },
      {
        path: "customer/service/review/:storeId",
        element: <ReviewManagementPage />,
      },
    ],
  },
  {
    path: "/seller/store/create",
    element: <CreateStorePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
