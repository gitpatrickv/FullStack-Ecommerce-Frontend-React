import {
  Avatar,
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ColorModeSwitch from "../../components/ColorModeSwitch";
import SidebarAdmin from "../../components/Sidebar/admin/SidebarAdmin";
import { useAuthQueryStore } from "../../store/auth-store";
import Metrics from "../../components/Dashboard/admin/Metrics";
import LatestOrders from "../../components/Dashboard/admin/LatestOrders";
import useGetAllOrders from "../../hooks/admin/useGetAllOrders";
import LatestOrdersHeader from "../../components/Dashboard/admin/LatestOrdersHeader";

const AdminPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuthQueryStore();
  const { data: getAllOrders } = useGetAllOrders();

  const handleLogout = () => {
    logout(navigate);
    queryClient.setQueryData(["user"], null);
  };
  return (
    <Grid
      templateColumns="0.2fr 1fr 0.2fr"
      templateRows="100px 1fr"
      templateAreas={`
    "header header header"
    "sidebar content1 sidebar1"
  `}
    >
      <GridItem area="header">
        <Card borderRadius="none">
          <CardBody>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link to="/admin">
                <Box ml="20px" display="flex">
                  <Text
                    fontSize="x-large"
                    textTransform="uppercase"
                    fontWeight="semibold"
                    color="orange.400"
                    cursor="pointer"
                    userSelect="none"
                  >
                    HOME
                  </Text>
                </Box>
              </Link>
              <Box display="flex" alignItems="center" mr="20px">
                <Menu>
                  <MenuButton
                    mr="10px"
                    as={IconButton}
                    aria-label="Options"
                    icon={<RxHamburgerMenu size="22px" />}
                    variant="outline"
                    size="sm"
                  />
                  <MenuList>
                    <MenuItem>
                      <ColorModeSwitch />
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={
                      <Avatar
                        src={
                          "https://media.istockphoto.com/id/912819604/vector/storefront-flat-design-e-commerce-icon.jpg?s=612x612&w=0&k=20&c=_x_QQJKHw_B9Z2HcbA2d1FH1U1JVaErOAp2ywgmmoTI="
                        }
                        size="sm"
                      />
                    }
                    variant="none"
                  />
                  <MenuList>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Box>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem area="sidebar">
        <Box mt="15px" ml="10px" minWidth="200px">
          <SidebarAdmin />
        </Box>
      </GridItem>

      <GridItem area="sidebar1">
        <Box mt="15px" ml="10px" width="200px"></Box>
      </GridItem>

      <GridItem area="content1">
        {location.pathname === "/admin" ? (
          <Grid
            templateColumns="1fr"
            templateAreas={`
          "content1"
          `}
            gap={4}
            p={3}
          >
            <GridItem area="content1">
              <Metrics />
              <LatestOrdersHeader />
              {getAllOrders?.map((order) => (
                <LatestOrders key={order.orderId} order={order} />
              ))}
            </GridItem>
          </Grid>
        ) : (
          <Box>
            <Outlet />
          </Box>
        )}
      </GridItem>
    </Grid>
  );
};

export default AdminPage;
