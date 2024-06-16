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
import useGetAllCustomerOrders from "../../hooks/user/useGetAllCustomerOrders";
import useGetOrderByCompletedStatus from "../../hooks/user/useGetOrderByCompletedStatus";
import useGetOrdersByCancelledStatus from "../../hooks/user/useGetOrdersByCancelledStatus";
import useGetOrdersByPendingStatus from "../../hooks/user/useGetOrdersByPendingStatus";
import useGetOrdersByToPayStatus from "../../hooks/user/useGetOrdersByToPayStatus";
import useGetOrdersByToReceiveStatus from "../../hooks/user/useGetOrdersByToReceiveStatus";
import useGetOrdersByToShipStatus from "../../hooks/user/useGetOrdersByToShipStatus";
import { useAuthQueryStore } from "../../store/auth-store";
import AllOrderPage from "./AllOrderPage";
import CancelledPage from "./CancelledPage";
import CompletedPage from "./CompletedPage";
import PendingPage from "./PendingPage";
import ToPayPage from "./ToPayPage";
import ToReceivePage from "./ToReceivePage";
import ToShipPage from "./ToShipPage";
const MyPurchasePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { refetch: refetchAllOrders } = useGetAllCustomerOrders(jwtToken);
  const { refetch: refetchPendingOrders } =
    useGetOrdersByPendingStatus(jwtToken);
  const { refetch: refetchToPayOrders } = useGetOrdersByToPayStatus(jwtToken);
  const { refetch: refetchToShipOrders } = useGetOrdersByToShipStatus(jwtToken);
  const { refetch: refetchToReceiveOrders } =
    useGetOrdersByToReceiveStatus(jwtToken);
  const { refetch: refetchCancelledOrders } =
    useGetOrdersByCancelledStatus(jwtToken);
  const { refetch: refetchCompletedOrders } =
    useGetOrderByCompletedStatus(jwtToken);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabRoutes = [
    "/user/purchase/order/all",
    "/user/purchase/order/pending",
    "/user/purchase/order/to-pay",
    "/user/purchase/order/to-ship",
    "/user/purchase/order/to-receive",
    "/user/purchase/order/completed",
    "/user/purchase/order/cancelled",
  ];

  useEffect(() => {
    switch (location.pathname) {
      case "/user/purchase/order/all":
        setSelectedIndex(0);
        refetchAllOrders();
        break;
      case "/user/purchase/order/pending":
        setSelectedIndex(1);
        refetchPendingOrders();
        break;
      case "/user/purchase/order/to-pay":
        setSelectedIndex(2);
        refetchToPayOrders();
        break;
      case "/user/purchase/order/to-ship":
        setSelectedIndex(3);
        refetchToShipOrders();
        break;
      case "/user/purchase/order/to-receive":
        setSelectedIndex(4);
        refetchToReceiveOrders();
        break;
      case "/user/purchase/order/completed":
        setSelectedIndex(5);
        refetchCompletedOrders();
        break;
      case "/user/purchase/order/cancelled":
        setSelectedIndex(6);
        refetchCancelledOrders();
        break;
      default:
        setSelectedIndex(0);
    }
  }, [location.pathname]);

  const handleTabsChange = (index: number) => {
    navigate(tabRoutes[index]);
  };

  return (
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
          <Tab>To Pay</Tab>
          <Tab>To Ship</Tab>
          <Tab>To Receive</Tab>
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
            <AllOrderPage />
          </TabPanel>
          <TabPanel>
            <PendingPage />
          </TabPanel>
          <TabPanel>
            <ToPayPage />
          </TabPanel>
          <TabPanel>
            <ToShipPage />
          </TabPanel>
          <TabPanel>
            <ToReceivePage />
          </TabPanel>
          <TabPanel>
            <CompletedPage />
          </TabPanel>
          <TabPanel>
            <CancelledPage />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MyPurchasePage;
