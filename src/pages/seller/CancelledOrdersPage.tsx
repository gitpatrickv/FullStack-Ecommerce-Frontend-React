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
import SellersOrderCard from "../../components/Order/SellersOrderCard";
import OrderItem from "../../entities/Order";
import useConfirmCancelOrder from "../../hooks/seller/useConfirmCancelOrder";
import useGetCancelledOrders from "../../hooks/seller/useGetCancelledOrders";
import { useAuthQueryStore } from "../../store/auth-store";
import { formatCurrency } from "../../utilities/formatCurrency";
const CancelledOrdersPage = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { storeId } = useParams();
  const { data: orders, refetch: refetchCancelledOrders } =
    useGetCancelledOrders(jwtToken, storeId!);
  const { mutate: confirmCancelOrder } = useConfirmCancelOrder();
  const orderArray = Array.isArray(orders?.orderModel) ? orders.orderModel : [];
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

  const handleCancelOrderClick = (orderId: string) => {
    confirmCancelOrder(
      { orderId, jwtToken: jwtToken },
      {
        onSuccess: () => {
          refetchCancelledOrders();
        },
      }
    );
  };

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
                      <SellersOrderCard key={order.id} order={order} />
                    ))}
                    <Divider mt={2} mb={2} />
                    <Box
                      display="flex"
                      justifyContent="end"
                      alignItems="end"
                      flexDirection="column"
                    >
                      <Text fontSize="xl" pt="5px">
                        Order Total:
                        <Text as="span" color="orange.400" ml="10px">
                          {formatCurrency(storeOrders[0].orderTotalAmount)}
                        </Text>
                      </Text>
                      {storeOrders[0].active === true && (
                        <Button
                          _hover={{ color: "orange.400" }}
                          width="120px"
                          mt="10px"
                          onClick={() =>
                            handleCancelOrderClick(storeOrders[0].orderId)
                          }
                        >
                          Confirm
                        </Button>
                      )}
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

export default CancelledOrdersPage;
