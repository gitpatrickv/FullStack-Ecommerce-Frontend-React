import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../../components/Navbar/Header";
import { useAuthQueryStore } from "../../store/auth-store";
import ChatPage from "./ChatPage";
import Footer from "../../components/Footer/Footer";

const Layout = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <>
        <Header />
        <Grid templateColumns="1fr" templateAreas={`"main"`} mt="120px">
          <GridItem area="main">
            <Box padding={5}>
              <Outlet />
              <ScrollRestoration />
            </Box>
          </GridItem>
        </Grid>
        {jwtToken ? (
          <Box position="fixed" bottom="0" right="20px" zIndex={10}>
            <ChatPage />
          </Box>
        ) : (
          ""
        )}
      </>
      <Footer />
    </Box>
  );
};

export default Layout;
