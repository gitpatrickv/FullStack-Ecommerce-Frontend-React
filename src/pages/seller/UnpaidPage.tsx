import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import OrderCard from "../../components/Order/OrderCard";
import OrderItem from "../../entities/Order";
import useGetUnpaidOrders from "../../hooks/seller/useGetUnpaidOrders";

import { useAuthQueryStore } from "../../store/auth-store";
import { formatCurrency } from "../../utilities/formatCurrency";
import useHandleOrders from "../../hooks/seller/useHandleOrders";

const UnpaidPage = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { mutate: toShip } = useHandleOrders();
  const { storeId } = useParams();
  const { data: orders, refetch: refetchUnpaidOrders } = useGetUnpaidOrders(
    jwtToken,
    storeId!
  );
  const orderArray = Array.isArray(orders?.orderModel) ? orders.orderModel : [];
  const handleToShipClick = (orderId: string) => {
    toShip(
      { jwtToken, orderId },
      {
        onSuccess: () => {
          refetchUnpaidOrders();
        },
      }
    );
  };

  const groupedOrders = orderArray.reduce(
    (acc: Record<string, OrderItem[]>, order) => {
      order.orderItemModels.forEach((item) => {
        if (!acc[item.orderId]) {
          acc[item.orderId] = [];
        }
        acc[item.orderId].push(item);
      });
      return acc;
    },
    {}
  );

  return (
    <Grid
      templateColumns="1fr"
      templateAreas={`
"main"
`}
    >
      <GridItem area="main">
        {groupedOrders &&
          Object.entries(groupedOrders).map(([orderId, storeOrders]) => {
            return (
              <Box key={orderId} mt="5px">
                <Card borderRadius="none">
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
                        {storeOrders[0].fullName}
                      </Text>

                      <Box position="absolute" right="25px" alignItems="center">
                        <Box
                          display="flex"
                          textAlign="center"
                          alignItems="center"
                        >
                          <Text
                            fontSize={{
                              base: "sm",
                              md: "md",
                            }}
                            mr="10px"
                            color="skyblue"
                          >
                            {storeOrders[0].orderStatusInfo}
                          </Text>
                          <Text fontWeight="" mr="10px" color="gray.500">
                            |
                          </Text>
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
                      <Text fontSize="xl" mb="15px" pt="5px">
                        Amount Payable:
                        <Text as="span" color="orange.400" ml="10px">
                          {formatCurrency(storeOrders[0].orderTotalAmount)}
                        </Text>
                      </Text>
                      <Button
                        _hover={{ color: "orange.400" }}
                        onClick={() => {
                          handleToShipClick(storeOrders[0].orderId);
                        }}
                      >
                        To Ship
                      </Button>
                    </Box>
                  </CardBody>
                </Card>
              </Box>
            );
          })}
      </GridItem>
    </Grid>
  );
};

export default UnpaidPage;
