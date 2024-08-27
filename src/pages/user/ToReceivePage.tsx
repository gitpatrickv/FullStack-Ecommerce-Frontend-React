import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
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
import useGetOrdersByToReceiveStatus from "../../hooks/user/useGetOrdersByToReceiveStatus";
import { useAuthQueryStore } from "../../store/auth-store";
import { formatCurrency } from "../../utilities/formatCurrency";

const ToReceivePage = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { data: orders, refetch: refetchToReceiveOrders } =
    useGetOrdersByToReceiveStatus(jwtToken);
  const { mutate: orderReceived } = useHandleOrders();
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

  const handleNavigateStorePageClick = (storeId: string) => {
    navigate(`/store/` + storeId);
  };

  const handleOrderReceivedClick = (orderId: string) => {
    orderReceived(
      { jwtToken, orderId },
      {
        onSuccess: () => {
          refetchToReceiveOrders();
          onClose();
        },
      }
    );
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
                      Order Total:
                      <Text as="span" color="orange.400" ml="10px">
                        {formatCurrency(storeOrders[0].orderTotalAmount)}
                      </Text>
                    </Text>
                    <Button
                      _hover={{ color: "orange.400" }}
                      onClick={() => {
                        setSelectedOrderId(storeOrders[0].orderId);
                        onOpen();
                      }}
                    >
                      Order Received
                    </Button>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          );
        })}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        size="lg"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody mt="20px">
              <Text>
                Check that you received all items in satisfactory condition
                before confirming receipt. Once you confirm, the order is
                completed and we will release the payment to seller
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter mb="10px">
              <Button
                ref={cancelRef}
                onClick={onClose}
                _hover={{ color: "orange.500" }}
                width="120px"
              >
                NOT NOW
              </Button>
              <Button
                bg="orange.500"
                _hover={{ bg: "orange.600" }}
                ml={3}
                onClick={() => handleOrderReceivedClick(selectedOrderId!)}
                width="120px"
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ToReceivePage;
