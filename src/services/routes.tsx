import { createBrowserRouter } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import CartPage from "../pages/CartPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import LoginPage from "../pages/LoginPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import RegisterPage from "../pages/RegisterPage";
import SellerPage from "../pages/SellerPage";

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
