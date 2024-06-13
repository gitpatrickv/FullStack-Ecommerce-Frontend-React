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
import { FaHome } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ColorModeSwitch from "../../components/ColorModeSwitch";
import Sidebar from "../../components/Sidebar/Sidebar";
import useGetUser from "../../hooks/user/useGetUser";
import { useAuthQueryStore } from "../../store/auth-store";

const SellerPage = () => {
  const queryClient = useQueryClient();
  const { logout, authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: user } = useGetUser(jwtToken);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate);
    queryClient.setQueryData(["user"], null);
  };
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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box ml="20px">
                <Link to="/seller">
                  <FaHome size="40" />
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
                          user?.photoUrl
                            ? user?.photoUrl
                            : "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
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
                <Text ml="10px">{user?.email}</Text>
              </Box>
            </Box>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem area="sidebar">
        <Box mt="15px" ml="10px">
          <Sidebar />
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
