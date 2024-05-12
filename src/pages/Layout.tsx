import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Navbar/Header";
import NavBar from "../components/Navbar/NavBar";

const Layout = () => {
  return (
    <>
      <Header />
      <NavBar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
