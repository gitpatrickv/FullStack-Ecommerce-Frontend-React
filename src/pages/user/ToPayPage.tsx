import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OrderCard from "../../components/Order/OrderCard";
import OrderItem from "../../entities/Order";
import useCancelOrder from "../../hooks/user/useCancelOrder";
import useGetOrdersByCancelledStatus from "../../hooks/user/useGetOrdersByCancelledStatus";
import useGetOrdersByToPayStatus from "../../hooks/user/useGetOrdersByToPayStatus";
import { useAuthQueryStore } from "../../store/auth-store";
import { formatCurrency } from "../../utilities/formatCurrency";

const ToPayPage = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { data: orders, refetch: refetchToPayOrders } =
    useGetOrdersByToPayStatus(jwtToken);
  const { refetch: refetchCancelledOrders } =
    useGetOrdersByCancelledStatus(jwtToken);
  const { mutate: cancelOrder } = useCancelOrder();
  const orderArray = Array.isArray(orders) ? orders : [];
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

  const handleCancelOrderClick = (orderId: string) => {
    cancelOrder(
      { orderId, jwtToken: jwtToken },
      {
        onSuccess: () => {
          refetchToPayOrders();
          refetchCancelledOrders();
          onClose();
        },
      }
    );
  };

  const handleNavigateStorePageClick = (storeId: string) => {
    navigate(`/store/` + storeId);
  };

  return (
    <>
      {groupedOrders &&
        Object.entries(groupedOrders).map(([_, storeOrders]) => {
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
                      onClick={() => {
                        setSelectedOrderId(storeOrders[0].orderId);
                        onOpen();
                      }}
                      _hover={{ color: "orange.400" }}
                    >
                      Cancel Order
                    </Button>
                    <AlertDialog
                      isOpen={isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                      isCentered
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            <Text color="orange.400" fontSize="large">
                              Cancel Order
                            </Text>
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            <Text>
                              Are you sure you want to cancel your order?
                            </Text>
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Close
                            </Button>
                            <Button
                              bg="red.500"
                              _hover={{ bg: "red.600" }}
                              ml={3}
                              onClick={() =>
                                handleCancelOrderClick(selectedOrderId!)
                              }
                            >
                              Cancel Order
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
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
