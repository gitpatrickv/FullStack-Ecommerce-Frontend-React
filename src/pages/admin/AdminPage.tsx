import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ColorModeSwitch from "../../components/ColorModeSwitch";
import LatestOrders from "../../components/Dashboard/admin/LatestOrders";
import LatestOrdersHeader from "../../components/Dashboard/admin/LatestOrdersHeader";
import Metrics from "../../components/Dashboard/admin/Metrics";
import SidebarAdmin from "../../components/Sidebar/admin/SidebarAdmin";
import useGetAllOrders from "../../hooks/admin/useGetAllOrders";
import useGetUser from "../../hooks/user/useGetUser";
import { useAuthQueryStore } from "../../store/auth-store";
import { paginationRange } from "../../utilities/pagination";

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { logout, authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: user } = useGetUser(jwtToken);
  const getPageFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = params.get("pageNo");
    return pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
  };

  const [page, setPage] = useState(getPageFromUrl);
  const pageSize = 20;

  const { data: getAllOrders } = useGetAllOrders({
    pageNo: page,
    pageSize,
  });

  const cPage = getAllOrders?.pageResponse.pageNo ?? 0;
  const currentPage = cPage + 1;
  const totalPages = getAllOrders?.pageResponse.totalPages ?? 0;
  const isLastPage = getAllOrders?.pageResponse.last ?? false;
  const totalElements = getAllOrders?.pageResponse.totalElements ?? 0;
  const pages = Math.ceil(totalElements / pageSize);
  const orders = getAllOrders?.orderModels || [];
  const paginationRangeArray = paginationRange({
    totalPage: pages,
    page: page,
    limit: pageSize,
    siblings: 1,
  });

  const handleLogout = () => {
    logout(navigate);
    queryClient.setQueryData(["user"], null);
  };

  useEffect(() => {
    const pageFromUrl = getPageFromUrl();
    if (pageFromUrl !== page) {
      setPage(pageFromUrl);
    }
  }, [location.search]);

  const updatePage = (newPage: number) => {
    setPage(newPage);
    navigate(`/admin?pageNo=${newPage}&pageSize=${pageSize}`);
  };

  function handlePageChange(value: any) {
    if (value === "&laquo;" || value === "... ") {
      updatePage(1);
    } else if (value === "&lsaquo;") {
      if (page > 1) {
        updatePage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (!isLastPage) {
        updatePage(page + 1);
      }
    } else if (value === "&raquo;" || value === " ...") {
      updatePage(pages);
    } else {
      updatePage(value);
    }
  }
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
                <ColorModeSwitch />
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
                <Text ml="5px">{user?.email}</Text>
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
          <SidebarAdmin />
        </Card>
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
          >
            <GridItem area="content1" mt="30px" ml="10px">
              <Metrics />
              <Card borderRadius="none" mt="10px">
                <CardBody>
                  <Box display="flex">
                    <Text fontSize="xl" fontWeight="bold" ml="15px">
                      Latest Orders
                    </Text>
                    <Spacer />
                    <Text pr="15px" fontSize="medium" mt="10px">
                      <Text as="span" color="orange">
                        {currentPage}
                      </Text>
                      /{totalPages}
                    </Text>
                    <Button
                      mr="2px"
                      onClick={() => handlePageChange("&lsaquo;")}
                    >
                      &lsaquo;
                    </Button>
                    <Button onClick={() => handlePageChange("&rsaquo;")}>
                      &rsaquo;
                    </Button>
                  </Box>
                </CardBody>
              </Card>
              <LatestOrdersHeader />
              {getAllOrders?.orderModels.map((order) => (
                <LatestOrders key={order.orderId} order={order} />
              ))}
              {orders.length > 0 && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  pt="20px"
                >
                  <HStack justifyContent="center">
                    <Button onClick={() => handlePageChange("&laquo;")}>
                      &laquo;
                    </Button>
                    <Button onClick={() => handlePageChange("&lsaquo;")}>
                      &lsaquo;
                    </Button>
                    {paginationRangeArray.map((number, index) => {
                      if (number === number) {
                        return (
                          <Button
                            key={index}
                            onClick={() => handlePageChange(number)}
                            color={page === number ? "orange.500" : "white.500"}
                          >
                            {number}
                          </Button>
                        );
                      }
                    })}
                    <Button onClick={() => handlePageChange("&rsaquo;")}>
                      &rsaquo;
                    </Button>
                    <Button onClick={() => handlePageChange("&raquo;")}>
                      &raquo;
                    </Button>
                  </HStack>
                </Box>
              )}
            </GridItem>
          </Grid>
        ) : (
          <Box mt="30px" ml="10px">
            <Outlet />
          </Box>
        )}
      </GridItem>
    </Grid>
  );
};

export default AdminPage;
