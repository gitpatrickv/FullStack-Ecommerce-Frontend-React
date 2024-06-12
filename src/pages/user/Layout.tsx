import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../../components/Navbar/Header";

const Layout = () => {
  return (
    <Grid
      templateColumns="0fr 1fr 0fr"
      templateRows="0fr 1fr"
      templateAreas={`
"asideLeft header asideRight"
"asideLeft main asideRight"
`}
    >
      <GridItem area="header" position="sticky" w="100%" top="0" zIndex={10}>
        <Header />
      </GridItem>
      <GridItem area="main">
        <Box padding={5}>
          <Outlet />
          <ScrollRestoration />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Layout;
