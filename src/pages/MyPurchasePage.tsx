import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { FaStore } from "react-icons/fa";
import OrderCard from "../components/Order/OrderCard";
import OrderItem from "../entities/Order";
import useGetOrdersByToPayStatus from "../hooks/useGetOrdersByToPayStatus";
const MyPurchasePage = () => {
  const { data: orders } = useGetOrdersByToPayStatus();

  const groupedOrders = orders?.reduce(
    (acc: Record<string, OrderItem[]>, order: OrderItem) => {
      if (!acc[order.orderId]) {
        acc[order.orderId] = [];
      }
      acc[order.orderId].push(order);
      return acc;
    },
    {}
  );

  return (
    <Box>
      <Tabs position="relative" variant="unstyled" isLazy>
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
            <Card>
              <Text>ALL</Text>
            </Card>
          </TabPanel>
          <TabPanel>
            {groupedOrders &&
              Object.entries(groupedOrders).map(([storeName, storeOrders]) => {
                return (
                  <Box key={storeOrders[0].orderId} mt="10px">
                    {/* <Box key={storeName} mt="5px"> */}
                    <Card>
                      <CardBody>
                        <Box display="flex" alignItems="center">
                          <Text
                            pr="20px"
                            fontWeight="semibold"
                            pl="5px"
                            textTransform="uppercase"
                            fontSize={{
                              base: "sm",
                              md: "md",
                              lg: "lg",
                              xl: "xl",
                            }}
                          >
                            {storeOrders[0].storeName}
                            {/* {storeName} */}
                          </Text>
                          <Box
                            cursor="pointer"
                            display="flex"
                            alignItems="center"
                          >
                            <FaStore size="20px" />
                            <Text pl="5px" fontSize="small">
                              View Store
                            </Text>
                          </Box>
                          <Box
                            position="absolute"
                            right="25px"
                            alignItems="center"
                          >
                            <Text
                              fontSize={{
                                base: "sm",
                                md: "md",
                                lg: "lg",
                                xl: "xl",
                              }}
                              fontWeight="semibold"
                              color="orange.400"
                            >
                              {storeOrders[0].orderStatus}
                            </Text>
                          </Box>
                        </Box>
                        <Divider mt={2} mb={2} />
                        {storeOrders.map((order) => (
                          <OrderCard key={order.id} order={order} />
                        ))}
                        <Divider mt={2} mb={2} />
                        <Box
                          display="flex"
                          justifyContent="end"
                          alignItems="end"
                          flexDirection="column"
                        >
                          <Text fontSize="xl" mb="15px">
                            Order Total: P10000.00
                          </Text>
                          <Button>Cancel Order</Button>
                        </Box>
                      </CardBody>
                    </Card>
                  </Box>
                );
              })}
          </TabPanel>
          <TabPanel>
            <p>To Ship</p>
          </TabPanel>
          <TabPanel>
            <p>To Receive</p>
          </TabPanel>
          <TabPanel>
            <p>Completed</p>
          </TabPanel>
          <TabPanel>
            <p>Cancelled</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MyPurchasePage;
