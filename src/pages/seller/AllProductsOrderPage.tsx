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
import useGetAllStoreOrders from "../../hooks/seller/useGetAllStoreOrders";
import useHandleOrders from "../../hooks/seller/useHandleOrders";
import { useAuthQueryStore } from "../../store/auth-store";
import { formatCurrency } from "../../utilities/formatCurrency";
import useConfirmCancelOrder from "../../hooks/seller/useConfirmCancelOrder";

const AllProductsOrderPage = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { storeId } = useParams();
  const { data: orders, refetch: refetchAllOrders } = useGetAllStoreOrders(
    jwtToken,
    storeId!
  );
  const status = ["PENDING", "TO PAY"];
  const orderArray = Array.isArray(orders?.orderModel) ? orders.orderModel : [];
  const { mutate: handleOrder } = useHandleOrders();
  const { mutate: confirmCancelOrder } = useConfirmCancelOrder();
  const handleOrderClick = (orderId: string) => {
    handleOrder(
      { jwtToken, orderId },
      {
        onSuccess: () => {
          refetchAllOrders();
        },
      }
    );
  };

  const handleCancelOrderClick = (orderId: string) => {
    confirmCancelOrder(
      { orderId, jwtToken: jwtToken },
      {
        onSuccess: () => {
          refetchAllOrders();
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
                      {status.includes(storeOrders[0].orderStatus) ? (
                        <Text fontSize="xl" mb="15px" pt="5px">
                          Amount Payable:
                          <Text as="span" color="orange.400" ml="10px">
                            {formatCurrency(storeOrders[0].orderTotalAmount)}
                          </Text>
                        </Text>
                      ) : (
                        <Text fontSize="xl" pt="5px">
                          Order Total:
                          <Text as="span" color="orange.400" ml="10px">
                            {formatCurrency(storeOrders[0].orderTotalAmount)}
                          </Text>
                        </Text>
                      )}
                      {storeOrders[0].orderStatus === "PENDING" ? (
                        <Button
                          _hover={{ color: "orange.400" }}
                          onClick={() =>
                            handleOrderClick(storeOrders[0].orderId)
                          }
                        >
                          Confirm Order
                        </Button>
                      ) : (
                        ""
                      )}
                      {storeOrders[0].orderStatus === "TO PAY" ? (
                        <Button
                          _hover={{ color: "orange.400" }}
                          onClick={() =>
                            handleOrderClick(storeOrders[0].orderId)
                          }
                        >
                          To Ship
                        </Button>
                      ) : (
                        ""
                      )}
                      {storeOrders[0].orderStatus === "TO SHIP" ? (
                        <Button
                          mt="15px"
                          _hover={{ color: "orange.400" }}
                          onClick={() =>
                            handleOrderClick(storeOrders[0].orderId)
                          }
                        >
                          Ship Order
                        </Button>
                      ) : (
                        ""
                      )}
                      {storeOrders[0].active === true &&
                      storeOrders[0].orderStatus === "CANCELLED" ? (
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
                      ) : (
                        ""
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

export default AllProductsOrderPage;
