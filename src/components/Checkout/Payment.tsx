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
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useRef } from "react";

interface Props {
  shippingFee: number;
  totalPayment: number;
  onPlaceOrder: () => void;
}

const Payment = ({ shippingFee, totalPayment, onPlaceOrder }: Props) => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <Card maxW="100%" mt="5px" borderRadius="none">
      <CardBody>
        <Grid
          templateColumns="2fr  0.5fr 0.3fr"
          templateAreas={`
  "content1 content2 content3"
`}
        >
          <GridItem area="content1">
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              textAlign="start"
              pr="100px"
              whiteSpace="nowrap"
            >
              Payment Method
            </Text>
          </GridItem>

          <GridItem area="content2">
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              whiteSpace="nowrap"
              textAlign="end"
            >
              Cash On Delivery
            </Text>
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
              color="orange.400"
              fontSize={fontSize}
              fontWeight="semibold"
              cursor="pointer"
              textAlign="end"
              onClick={() => onOpen()}
            >
              Change
            </Text>

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
            <Box
              display="flex"
              justifyContent="flex-end"
              mt="20px"
              _hover={{ color: "orange.400" }}
            >
              <Button onClick={onPlaceOrder}>Place Order</Button>
            </Box>
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
                    <Box display="flex" justifyContent="center">
                      <Text fontSize="x-large">NOT YET IMPLEMENTED</Text>
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
            </AlertDialog>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Payment;
