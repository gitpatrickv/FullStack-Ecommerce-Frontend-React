import {
  Avatar,
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const SellerPage = () => {
  return (
    <Grid
      height="100vh"
      templateColumns="0.2fr 1fr 0.2fr"
      templateRows="0.1fr 1fr"
      templateAreas={`
      "header header header"
      "sidebar content1 sidebar1"
    `}
    >
      <GridItem area="header">
        <Card>
          <CardBody>
            <Box display="flex" justifyContent="space-between">
              <Text>Home</Text>
              <Box display="flex">
                <Avatar
                  src={
                    "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
                  }
                  size="sm"
                />
                <Text ml="10px">email address</Text>
              </Box>
            </Box>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem area="sidebar">
        <Box bg="gray" height="100%">
          <Sidebar />
        </Box>
      </GridItem>

      <GridItem area="sidebar1">
        <Box bg="orange" height="100%">
          Sidebar 1
        </Box>
      </GridItem>
      <GridItem area="content1">
        <Box>
          <Outlet />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default SellerPage;
