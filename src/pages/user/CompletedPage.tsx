import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaStore } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import OrderCard from "../../components/Order/OrderCard";
import OrderItem from "../../entities/Order";
import useBuyAgain from "../../hooks/user/useBuyAgain";
import useCartTotal from "../../hooks/user/useCartTotal";
import useCarts from "../../hooks/user/useCarts";
import useGetOrderByCompletedStatus from "../../hooks/user/useGetOrderByCompletedStatus";
import { useAuthQueryStore } from "../../store/auth-store";
import { formatCurrency } from "../../utilities/formatCurrency";

const CompletedPage = () => {
  const ratings = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                    <Text fontSize="xl" mb="15px" pt="5px">
                      Order Total:
                      <Text as="span" color="orange.400" ml="10px">
                        {formatCurrency(storeOrders[0].orderTotalAmount)}
                      </Text>
                    </Text>
                    <Box display="flex">
                      <Button
                        bg="orange.500"
                        _hover={{ bg: "orange.600" }}
                        mr="10px"
                        width="120px"
                        onClick={onOpen}
                      >
                        Rate
                      </Button>
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
      <Box>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Rate Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Product Quality</FormLabel>
                <Input></Input>
                <Box display="flex">
                  {ratings.map((rate) => (
                    <Box
                      as={IoIosStar}
                      // color={
                      //   rate <= ratingAvg ? "orange.400" : "gray.600"
                      // }
                      key={rate}
                    />
                  ))}
                </Box>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Review</FormLabel>
                <Input placeholder="Last name" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={onClose}
                width="100px"
                _hover={{ color: "orange.400" }}
              >
                Cancel
              </Button>
              <Button
                bg="orange.500"
                _hover={{ bg: "orange.600" }}
                ml="10px"
                width="100px"
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default CompletedPage;
