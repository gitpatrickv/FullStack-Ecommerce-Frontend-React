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
import useHandleOrders from "../../hooks/seller/useHandleOrders";
import useBuyAgain from "../../hooks/user/useBuyAgain";
import useCancelOrder from "../../hooks/user/useCancelOrder";
import useCartTotal from "../../hooks/user/useCartTotal";
import useCarts from "../../hooks/user/useCarts";
import useGetAllCustomerOrders from "../../hooks/user/useGetAllCustomerOrders";
import { useAuthQueryStore } from "../../store/auth-store";
import { formatCurrency } from "../../utilities/formatCurrency";
import ProductToRate from "../../components/Order/ProductToRate";

const AllOrderPage = () => {
  const status = ["PENDING", "TO PAY"];
  const cancelOrderStatus = ["TO PAY", "TO SHIP"];
  const buyAgainClick = ["COMPLETED", "RATED", "CANCELLED"];
  const navigate = useNavigate();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { data: orders, refetch: refetchAllOrders } =
    useGetAllCustomerOrders(jwtToken);
  const { mutate: buyAgain } = useBuyAgain();
  const { refetch: refetchCarts } = useCarts(jwtToken);
  const { refetch: refetchTotal } = useCartTotal(jwtToken);
  const { mutate: cancelOrder } = useCancelOrder();
  const { mutate: handleOrders } = useHandleOrders();
  const orderArray = Array.isArray(orders) ? orders : [];
  const handleOrderClick = (orderId: string) => {
    handleOrders(
      { jwtToken, orderId },
      {
        onSuccess: () => {
          refetchAllOrders();
        },
      }
    );
  };

  const handleCancelOrderClick = (orderId: string) => {
    cancelOrder(
      { orderId, jwtToken: jwtToken },
      {
        onSuccess: () => {
          refetchAllOrders();
          onClose();
        },
      }
    );
  };

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
                    {status.includes(storeOrders[0].orderStatus) ? (
                      <Text fontSize="xl" pt="5px">
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
                    {cancelOrderStatus.includes(storeOrders[0].orderStatus) ? (
                      <>
                        <Button
                          mt="15px"
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
                              <AlertDialogHeader
                                fontSize="lg"
                                fontWeight="bold"
                              >
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
                      </>
                    ) : (
                      ""
                    )}
                    {storeOrders[0].orderStatus === "TO RECEIVE" ? (
                      <Button
                        mt="15px"
                        _hover={{ color: "orange.400" }}
                        onClick={() => handleOrderClick(storeOrders[0].orderId)}
                      >
                        Order Received
                      </Button>
                    ) : (
                      ""
                    )}
                    {buyAgainClick.includes(storeOrders[0].orderStatus) ? (
                      <Button
                        mt="15px"
                        onClick={() =>
                          handleBuyAgainClick(storeOrders[0].orderId)
                        }
                        _hover={{ color: "orange.400" }}
                      >
                        Buy Again
                      </Button>
                    ) : (
                      ""
                    )}
                    {storeOrders[0].orderStatus === "COMPLETED" ? (
                      <Box position="absolute" bottom="20px" right="125px">
                        <ProductToRate orderId={storeOrders[0].orderId} />
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                </CardBody>
              </Card>
            </Box>
          );
        })}
    </>
  );
};

export default AllOrderPage;
