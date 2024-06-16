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
import Sidebar from "../../components/Sidebar/Sidebar";
import useGetStoreInfo from "../../hooks/seller/useGetStoreInfo";
import { useAuthQueryStore } from "../../store/auth-store";

const SellerPage = () => {
  const queryClient = useQueryClient();
  const { logout, authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: store } = useGetStoreInfo(jwtToken);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate);
    queryClient.setQueryData(["user"], null);
  };
  return (
    <Grid
      templateColumns="250px 1fr 250px"
      templateRows="100px 1fr"
      templateAreas={`
      "header header header"
      "sidebar content1 sidebar1"
    `}
    >
      <GridItem area="header">
        <Card>
          <CardBody>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box ml="20px" display="flex">
                <Link to="/seller">
                  <Text
                    fontSize="x-large"
                    textTransform="uppercase"
                    fontWeight="semibold"
                    color="orange.400"
                  >
                    {store?.storeName}
                  </Text>
                </Link>
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
                    <MenuItem>Store Information</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
                <Text ml="10px">{store?.email}</Text>
              </Box>
            </Box>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem area="sidebar">
        <Box mt="15px" ml="10px">
          <Sidebar storeId={store?.storeId || ""} />
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
