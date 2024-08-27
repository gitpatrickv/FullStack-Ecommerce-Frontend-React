import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
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
      <Header />
      <Grid
        templateColumns="250px 1fr 250px"
        templateAreas={{
          base: ` "main"`,
          lg: `  "asideLeft main asideRight"`,
        }}
        mt="120px"
      >
        <GridItem area="main" minWidth="1300px" as="section">
          <Box padding={5}>
            <Outlet />
            <ScrollRestoration />
          </Box>
        </GridItem>
      </Grid>
      {jwtToken && (
        <Box position="fixed" bottom="0" right="20px" zIndex={10}>
          <ChatPage />
        </Box>
      )}
      <Footer />
      <Show above="lg">
        <GridItem area="asideLeft" as="aside">
          <Box minWidth="250px"></Box>
        </GridItem>

        <GridItem area="asideRight">
          <Box minWidth="250px" as="aside"></Box>
        </GridItem>
      </Show>
    </Box>
  );
};

export default Layout;
