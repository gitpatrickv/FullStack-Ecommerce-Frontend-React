import {
  Box,
  Divider,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AllProductsOrderPage from "./AllProductsOrderPage";
import CancelledOrdersPage from "./CancelledOrdersPage";
import CompletedOrdersPage from "./CompletedOrdersPage";
import ShippingPage from "./ShippingPage";
import ToShipOrdersPage from "./ToShipOrdersPage";
import UnpaidPage from "./UnpaidPage";
import useGetStoreInfo from "../../hooks/seller/useGetStoreInfo";
import { useAuthQueryStore } from "../../store/auth-store";
import PendingPage from "./PendingPage";
import useGetPendingOrders from "../../hooks/seller/useGetPendingOrders";
import useGetUnpaidOrders from "../../hooks/seller/useGetUnpaidOrders";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: store } = useGetStoreInfo(jwtToken);
  const { refetch: refetchPending } = useGetPendingOrders(
    jwtToken,
    store?.storeId || ""
  );
  const { refetch: refetchUnpaid } = useGetUnpaidOrders(
    jwtToken,
    store?.storeId || ""
  );

  const tabRoutes = [
    "/seller/order/all",
    `/seller/order/pending/${store?.storeId}`,
    `/seller/order/unpaid/${store?.storeId}`,
    "/seller/order/to-ship",
    "/seller/order/shipping",
    "/seller/order/completed",
    "/seller/order/cancellation",
  ];

  useEffect(() => {
    switch (location.pathname) {
      case "/seller/order/all":
        setSelectedIndex(0);
        break;
      case `/seller/order/pending/${store?.storeId}`:
        setSelectedIndex(1);
        refetchPending();
        break;
      case `/seller/order/unpaid/${store?.storeId}`:
        setSelectedIndex(2);
        refetchUnpaid();
        break;
      case "/seller/order/to-ship":
        setSelectedIndex(3);
        break;
      case "/seller/order/shipping":
        setSelectedIndex(4);
        break;
      case "/seller/order/completed":
        setSelectedIndex(5);
        break;
      case "/seller/order/cancellation":
        setSelectedIndex(6);
        break;
      default:
        setSelectedIndex(0);
    }
  }, [location.pathname, store?.storeId]);

  const handleTabsChange = (index: number) => {
    navigate(tabRoutes[index]);
  };

  return (
    <Box mt="20px">
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
  );
};

export default OrderPage;
