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
