import {
  Box,
  Divider,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import AllProductsOrderPage from "./AllProductsOrderPage";
import UnpaidPage from "./UnpaidPage";
import ToShipOrdersPage from "./ToShipOrdersPage";
import ShippingPage from "./ShippingPage";
import CompletedOrdersPage from "./CompletedOrdersPage";
import CancelledOrdersPage from "./CancelledOrdersPage";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabRoutes = [
    "/seller/order/all",
    "/seller/order/unpaid",
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
      case "/seller/order/unpaid":
        setSelectedIndex(1);
        break;
      case "/seller/order/to-ship":
        setSelectedIndex(2);
        break;
      case "/seller/order/shipping":
        setSelectedIndex(3);
        break;
      case "/seller/order/completed":
        setSelectedIndex(4);
        break;
      case "/seller/order/cancellation":
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
          <Tab>Unpaid</Tab>
          <Tab>To Ship</Tab>
          <Tab>Shipping</Tab>
          <Tab>Completed</Tab>
          <Tab>Cancellation</Tab>
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
