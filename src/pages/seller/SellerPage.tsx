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
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ColorModeSwitch from "../../components/ColorModeSwitch";
import BusinessInsights from "../../components/Dashboard/seller/BusinessInsights";
import ToDoList from "../../components/Dashboard/seller/ToDoList";

import Sidebar from "../../components/Sidebar/seller/Sidebar";
import useGetSuspendedProductCount from "../../hooks/admin/useGetSuspendedProductCount";
import useGetStoreInfo from "../../hooks/seller/useGetStoreInfo";
import useGetTodoTotal from "../../hooks/seller/useGetTodoTotal";
import useGetTotalSales from "../../hooks/seller/useGetTotalSales";
import { useAuthQueryStore } from "../../store/auth-store";

const SellerPage = () => {
  const queryClient = useQueryClient();
  const { logout, authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: store } = useGetStoreInfo(jwtToken);
  const { refetch: refetchTotalSales } = useGetTotalSales(store?.storeId || "");
  const { refetch: refetchTodoTotal } = useGetTodoTotal(store?.storeId || "");
  const { refetch: refetchSuspendedCount } = useGetSuspendedProductCount(
    store?.storeId || ""
  );
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout(navigate);
    queryClient.setQueryData(["user"], null);
  };

  const handleNavigateSellerPage = () => {
    navigate("/seller");
    refetchTotalSales();
    refetchTodoTotal();
    refetchSuspendedCount();
  };

  const handleShopInfoNavigateClick = () => {
    navigate("/seller/shop/info");
  };

  const handleCreateShopNavigateClick = () => {
    navigate("/seller/store/create");
  };

  return (
    <Grid
      templateColumns="0.2fr 1fr 0.2fr"
      templateRows="80px 1fr"
      templateAreas={`
      "header header header"
      "sidebar content1 sidebar1"
    `}
    >
      <GridItem area="header">
        <Card
          borderRadius="none"
          position="fixed"
          top="0"
          width="100%"
          zIndex={10}
        >
          <CardBody>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box ml="20px" display="flex">
                <Text
                  fontSize="x-large"
                  textTransform="uppercase"
                  fontWeight="semibold"
                  color="orange.400"
                  onClick={handleNavigateSellerPage}
                  cursor="pointer"
                  userSelect="none"
                >
                  {store?.storeName}
                </Text>
              </Box>
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
                          store?.photoUrl
                            ? store?.photoUrl
                            : "https://media.istockphoto.com/id/912819604/vector/storefront-flat-design-e-commerce-icon.jpg?s=612x612&w=0&k=20&c=_x_QQJKHw_B9Z2HcbA2d1FH1U1JVaErOAp2ywgmmoTI="
                        }
                        size="sm"
                      />
                    }
                    variant="none"
                  />
                  <MenuList>
                    <MenuItem onClick={handleShopInfoNavigateClick}>
                      Shop Profile
                    </MenuItem>
                    {!store?.storeId && (
                      <MenuItem onClick={handleCreateShopNavigateClick}>
                        Create Shop
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
                {store?.online === true ? (
                  <Text ml="5px">{store?.email}</Text>
                ) : (
                  <Text ml="5px" color="red">
                    Shop Suspended
                  </Text>
                )}
              </Box>
            </Box>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem area="sidebar" minWidth="250px" mr="20px">
        <Card
          position="fixed"
          minHeight="100vh"
          borderRadius="none"
          zIndex={10}
          minWidth="250px"
          height="100%"
        >
          <Sidebar storeId={store?.storeId || ""} />
        </Card>
      </GridItem>

      <GridItem area="sidebar1">
        <Box mt="15px" ml="10px" width="200px"></Box>
      </GridItem>

      <GridItem area="content1">
        {location.pathname === "/seller" ? (
          <Grid
            templateColumns="1fr"
            templateAreas={`
            "content1"
            `}
          >
            <GridItem area="content1" mt="30px" ml="10px">
              <ToDoList storeId={store?.storeId || ""} />
              <BusinessInsights
                orderCount={store?.orderCount ?? 0}
                productCount={store?.productCount ?? 0}
                storeId={store?.storeId || ""}
              />
            </GridItem>
          </Grid>
        ) : (
          <Box mt="30px" ml="10px">
            <Outlet />
            <ScrollRestoration />
          </Box>
        )}
      </GridItem>
    </Grid>
  );
};

export default SellerPage;
