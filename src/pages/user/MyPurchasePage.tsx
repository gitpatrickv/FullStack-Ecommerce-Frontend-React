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
import AllOrderPage from "./AllOrderPage";
import CancelledPage from "./CancelledPage";
import CompletedPage from "./CompletedPage";
import ToPayPage from "./ToPayPage";
import ToReceivePage from "./ToReceivePage";
import ToShipPage from "./ToShipPage";
const MyPurchasePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabRoutes = [
    "/user/purchase/order/all",
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
        break;
      case "/user/purchase/order/to-pay":
        setSelectedIndex(1);
        break;
      case "/user/purchase/order/to-ship":
        setSelectedIndex(2);
        break;
      case "/user/purchase/order/to-receive":
        setSelectedIndex(3);
        break;
      case "/user/purchase/order/completed":
        setSelectedIndex(4);
        break;
      case "/user/purchase/order/cancelled":
        setSelectedIndex(5);
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
