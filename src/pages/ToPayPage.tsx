import { Box, Button, Card, CardBody, Divider, Text } from "@chakra-ui/react";
import { FaStore } from "react-icons/fa";
import OrderCard from "../components/Order/OrderCard";
import OrderItem from "../entities/Order";
import useGetOrdersByToPayStatus from "../hooks/useGetOrdersByToPayStatus";
import { formatCurrency } from "../utilities/formatCurrency";

const ToPayPage = () => {
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
    <>
      {groupedOrders &&
        Object.entries(groupedOrders).map(([storeName, storeOrders]) => {
          return (
            <Box key={storeOrders[0].orderId} mt="5px">
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
                    </Text>
                    <Box cursor="pointer" display="flex" alignItems="center">
                      <FaStore size="15px" />
                      <Text pl="5px" fontSize="small">
                        View Store
                      </Text>
                    </Box>
                    <Box position="absolute" right="25px" alignItems="center">
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
                      Amount Payable:
                      <Text as="span" color="orange.400" ml="10px">
                        {formatCurrency(storeOrders[0].orderTotalAmount)}
                      </Text>
                    </Text>
                    <Button>Cancel Order</Button>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          );
        })}
    </>
  );
};

export default ToPayPage;
