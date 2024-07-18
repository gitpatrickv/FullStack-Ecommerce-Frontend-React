import { Box, Button, Card, CardBody, Divider, Text } from "@chakra-ui/react";
import { TbTruckDelivery } from "react-icons/tb";

import { FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OrderCard from "../../components/Order/OrderCard";
import ProductToRate from "../../components/Order/ProductToRate";
import OrderItem from "../../entities/Order";
import useBuyAgain from "../../hooks/user/useBuyAgain";
import useCartTotal from "../../hooks/user/useCartTotal";
import useCarts from "../../hooks/user/useCarts";
import useGetOrderByCompletedStatus from "../../hooks/user/useGetOrderByCompletedStatus";
import { useAuthQueryStore } from "../../store/auth-store";
import { formatCurrency } from "../../utilities/formatCurrency";

const CompletedPage = () => {
  const navigate = useNavigate();

  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: orders } = useGetOrderByCompletedStatus(jwtToken);
  const { mutate: buyAgain } = useBuyAgain();
  const { refetch: refetchCarts } = useCarts(jwtToken);
  const { refetch: refetchTotal } = useCartTotal(jwtToken);

  const orderArray = Array.isArray(orders) ? orders : [];
  const handleBuyAgainClick = (orderId: string) => {
    buyAgain(
      { orderId, jwtToken: jwtToken },
      {
        onSuccess: () => {
          refetchCarts();
          refetchTotal();
          navigate("/cart");
        },
      }
    );
  };

  const handleNavigateStorePageClick = (storeId: string) => {
    navigate(`/store/` + storeId);
  };

  const groupedOrders = orderArray?.reduce(
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
                      {storeOrders[0].storeName}
                    </Text>
                    <Box
                      cursor="pointer"
                      display="flex"
                      alignItems="center"
                      _hover={{ color: "orange.400" }}
                      onClick={() =>
                        handleNavigateStorePageClick(storeOrders[0].storeId)
                      }
                    >
                      <FaStore size="15px" />
                      <Text pl="5px" fontSize="small">
                        View Store
                      </Text>
                    </Box>
                    <Box position="absolute" right="25px" alignItems="center">
                      <Box
                        display="flex"
                        textAlign="center"
                        alignItems="center"
                      >
                        <Box mr="5px">
                          <TbTruckDelivery color="skyblue" size="20px" />
                        </Box>
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
                      Order Total:
                      <Text as="span" color="orange.400" ml="10px">
                        {formatCurrency(storeOrders[0].orderTotalAmount)}
                      </Text>
                    </Text>
                    <Box display="flex">
                      <ProductToRate orderId={storeOrders[0].orderId} />
                      <Button
                        onClick={() =>
                          handleBuyAgainClick(storeOrders[0].orderId)
                        }
                        _hover={{ color: "orange.400" }}
                        width="120px"
                      >
                        Buy Again
                      </Button>
                    </Box>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          );
        })}
    </>
  );
};

export default CompletedPage;
