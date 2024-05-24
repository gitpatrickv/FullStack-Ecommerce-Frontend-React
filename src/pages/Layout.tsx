import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Navbar/Header";
import NavBar from "../components/Navbar/NavBar";

const Layout = () => {
  return (
    <Grid
      templateColumns="0fr 1fr 0fr"
      templateRows="0fr 0fr 1fr"
      templateAreas={`
"asideLeft header asideRight"
"asideLeft navbar asideRight"
"asideLeft main asideRight"
`}
    >
      <GridItem area="header">
        <Header />
      </GridItem>
      <GridItem area="navbar">
        <NavBar />
      </GridItem>
      <GridItem area="main">
        <Box padding={5}>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Layout;
