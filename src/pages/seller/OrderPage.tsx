import {
  Box,
  Divider,
  Grid,
  GridItem,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGetAllStoreOrders from "../../hooks/seller/useGetAllStoreOrders";
import useGetCancelledOrders from "../../hooks/seller/useGetCancelledOrders";
import useGetCompletedOrders from "../../hooks/seller/useGetCompletedOrders";
import useGetPendingOrders from "../../hooks/seller/useGetPendingOrders";
import useGetShippingOrders from "../../hooks/seller/useGetShippingOrders";
import useGetStoreInfo from "../../hooks/seller/useGetStoreInfo";
import useGetToShip from "../../hooks/seller/useGetToShip";
import useGetUnpaidOrders from "../../hooks/seller/useGetUnpaidOrders";
import { useAuthQueryStore } from "../../store/auth-store";
import AllProductsOrderPage from "./AllProductsOrderPage";
import CancelledOrdersPage from "./CancelledOrdersPage";
import CompletedOrdersPage from "./CompletedOrdersPage";
import PendingPage from "./PendingPage";
import ShippingPage from "./ShippingPage";
import ToShipOrdersPage from "./ToShipOrdersPage";
import UnpaidPage from "./UnpaidPage";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: store } = useGetStoreInfo(jwtToken);
  const { storeId } = useParams();
  const { refetch: refetchPending } = useGetPendingOrders(jwtToken, storeId!);
  const { refetch: refetchUnpaid } = useGetUnpaidOrders(jwtToken, storeId!);
  const { refetch: refetchToShip } = useGetToShip(jwtToken, storeId!);
  const { refetch: refetchShippingOrders } = useGetShippingOrders(
    jwtToken,
    storeId!
  );
  const { refetch: refetchCancelledOrders } = useGetCancelledOrders(
    jwtToken,
    storeId!
  );
  const { refetch: refetchCompletedOrders } = useGetCompletedOrders(
    jwtToken,
    storeId!
  );
  const { refetch: refetchAllOrders } = useGetAllStoreOrders(
    jwtToken,
    storeId!
  );

  const tabRoutes = [
    `/seller/order/all/${store?.storeId}`,
    `/seller/order/pending/${store?.storeId}`,
    `/seller/order/unpaid/${store?.storeId}`,
    `/seller/order/to-ship/${store?.storeId}`,
    `/seller/order/shipping/${store?.storeId}`,
    `/seller/order/completed/${store?.storeId}`,
    `/seller/order/cancelled/${store?.storeId}`,
  ];

  useEffect(() => {
    switch (location.pathname) {
      case `/seller/order/all/${store?.storeId}`:
        setSelectedIndex(0);
        refetchAllOrders();
        break;
      case `/seller/order/pending/${store?.storeId}`:
        setSelectedIndex(1);
        refetchPending();
        break;
      case `/seller/order/unpaid/${store?.storeId}`:
        setSelectedIndex(2);
        refetchUnpaid();
        break;
      case `/seller/order/to-ship/${store?.storeId}`:
        setSelectedIndex(3);
        refetchToShip();
        break;
      case `/seller/order/shipping/${store?.storeId}`:
        setSelectedIndex(4);
        refetchShippingOrders();
        break;
      case `/seller/order/completed/${store?.storeId}`:
        setSelectedIndex(5);
        refetchCompletedOrders();
        break;
      case `/seller/order/cancelled/${store?.storeId}`:
        setSelectedIndex(6);
        refetchCancelledOrders();
        break;
      default:
        setSelectedIndex(0);
    }
  }, [location.pathname, store?.storeId]);

  const handleTabsChange = (index: number) => {
    navigate(tabRoutes[index]);
  };

  return (
    <Grid
      templateColumns="1fr"
      templateAreas={`
  "main"
  `}
    >
      <GridItem area="main" minWidth="1000px">
        <Box>
          <Tabs
            position="relative"
            variant="unstyled"
            isLazy
            index={selectedIndex}
            onChange={handleTabsChange}
          >
            <TabList display="flex" justifyContent="space-between">
              <Tab>All</Tab>
              <Tab>Pending</Tab>
              <Tab>Unpaid</Tab>
              <Tab>To Ship</Tab>
              <Tab>Shipping</Tab>
              <Tab>Completed</Tab>
              <Tab>Cancelled</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="orange.500"
              borderRadius="1px"
            />
            <Divider />
            <TabPanels>
              <TabPanel>
                <AllProductsOrderPage />
              </TabPanel>
              <TabPanel>
                <PendingPage />
              </TabPanel>
              <TabPanel>
                <UnpaidPage />
              </TabPanel>
              <TabPanel>
                <ToShipOrdersPage />
              </TabPanel>
              <TabPanel>
                <ShippingPage />
              </TabPanel>
              <TabPanel>
                <CompletedOrdersPage />
              </TabPanel>
              <TabPanel>
                <CancelledOrdersPage />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default OrderPage;
