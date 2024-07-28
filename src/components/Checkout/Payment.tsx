import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Grid,
  GridItem,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetOrdersByToPayStatus from "../../hooks/user/useGetOrdersByToPayStatus";
import usePlaceOrder from "../../hooks/user/usePlaceOrder";
import { useAuthQueryStore } from "../../store/auth-store";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  shippingFee: number;
  totalPayment: number;
  onRefetchCarts: () => void;
  onRefetchTotal: () => void;
}

const Payment = ({
  shippingFee,
  totalPayment,
  onRefetchCarts,
  onRefetchTotal,
}: Props) => {
  const navigate = useNavigate();
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { refetch: refetchOrderByToPayStatus } =
    useGetOrdersByToPayStatus(jwtToken);
  const { mutate: placeOrder } = usePlaceOrder();

  const handlePlaceOrder = () => {
    placeOrder(
      { jwtToken: jwtToken, paymentMethod: paymentMethod },
      {
        onSuccess: () => {
          onRefetchCarts(), onRefetchTotal(), refetchOrderByToPayStatus();
          {
            paymentMethod === "cash_on_delivery"
              ? navigate("/user/purchase/order/pending")
              : navigate("/user/purchase/order/to-ship");
          }
        },
      }
    );
  };

  return (
    <Card maxW="100%" mt="5px" borderRadius="none">
      <CardBody>
        <Grid
          templateRows="0.3fr 0.7fr"
          templateColumns="0.6fr 0.3fr 0.1fr"
          templateAreas={`
  "button button button"
  "content1 content2 content3"
`}
        >
          <GridItem
            area="button"
            minWidth={["700px", "900px", "1100px"]}
            mb="5px"
          >
            <Box display="flex" mt="5px" ml="15px" alignItems="center">
              <Text
                fontSize="xl"
                fontWeight="semibold"
                whiteSpace="nowrap"
                mr="50px"
              >
                Payment Method
              </Text>
              <ButtonGroup isAttached>
                <Button
                  color={
                    paymentMethod === "stripe" ? "orange.400" : "white.500"
                  }
                  border={
                    paymentMethod === "stripe" ? "1px solid orange" : "none"
                  }
                  _hover={{ color: "orange.400" }}
                  onClick={() => setPaymentMethod("stripe")}
                  mr="10px"
                  borderRadius="none"
                >
                  Stripe Payment
                </Button>
                <Button
                  color={
                    paymentMethod === "cash_on_delivery"
                      ? "orange.400"
                      : "white.500"
                  }
                  border={
                    paymentMethod === "cash_on_delivery"
                      ? "1px solid orange"
                      : "none"
                  }
                  _hover={{ color: "orange.400" }}
                  onClick={() => setPaymentMethod("cash_on_delivery")}
                  borderRadius="none"
                >
                  Cash On Delivery
                </Button>
              </ButtonGroup>
              <Spacer />
              <Text fontSize="xl" fontWeight="semibold" whiteSpace="nowrap">
                {paymentMethod === "stripe"
                  ? "Stripe Payment"
                  : paymentMethod === "cash_on_delivery"
                  ? "Cash On Delivery"
                  : ""}
              </Text>
            </Box>
          </GridItem>

          <GridItem area="content2">
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              whiteSpace="nowrap"
              textAlign="end"
            >
              Shipping Total:
            </Text>
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              whiteSpace="nowrap"
              textAlign="end"
            >
              Total Payment:
            </Text>
          </GridItem>
          <GridItem area="content3">
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              textAlign="end"
              color="orange.400"
            >
              {formatCurrency(shippingFee)}
            </Text>

            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              color="orange.400"
              textAlign="end"
              pl="5px"
            >
              {formatCurrency(totalPayment)}
            </Text>

            <Box display="flex" justifyContent="flex-end" mt="20px">
              <Button
                onClick={handlePlaceOrder}
                bg="orange.500"
                _hover={{ bg: "orange.600" }}
              >
                Place Order
              </Button>
            </Box>
            {/* <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isCentered
              size="lg"
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogBody mt="20px">
                    <Box display="flex" justifyContent="center">
                      
                      <RadioGroup
                        onChange={setPaymentMethod}
                        value={paymentMethod}
                      >
                        <Stack direction="row">
                          <Radio value="stripe">Stripe</Radio>
                          <Radio value="cash_on_delivery">
                            Cash on Delivery
                          </Radio>
                        </Stack>
                      </RadioGroup>
                      <ButtonGroup isAttached>
                        <Stack direction="row" spacing={4}>
                          <Button
                            colorScheme={
                              paymentMethod === "stripe" ? "blue" : "gray"
                            }
                            onClick={() => setPaymentMethod("stripe")}
                          >
                            Stripe
                          </Button>
                          <Button
                            colorScheme={
                              paymentMethod === "cash_on_delivery"
                                ? "blue"
                                : "gray"
                            }
                            onClick={() => setPaymentMethod("cash_on_delivery")}
                          >
                            Cash on Delivery
                          </Button>
                        </Stack>
                      </ButtonGroup>
                    </Box>
                  </AlertDialogBody>

                  <AlertDialogFooter mb="10px">
                    <Button
                      ref={cancelRef}
                      onClick={onClose}
                      _hover={{ color: "orange.500" }}
                      width="120px"
                    >
                      CLOSE
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog> */}
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Payment;
