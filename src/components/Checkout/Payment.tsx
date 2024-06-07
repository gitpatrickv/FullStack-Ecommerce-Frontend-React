import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  cartTotal: number;
  onPlaceOrder: () => void;
}

const Payment = ({ cartTotal, onPlaceOrder }: Props) => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  return (
    <Card maxW="100%" mt="5px">
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
            >
              Change
            </Text>

            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              textAlign="end"
              color="orange.400"
            >
              ₱40.00
            </Text>

            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              color="orange.400"
              textAlign="end"
              pl="5px"
            >
              {formatCurrency(cartTotal + 40)}
            </Text>
            <Box
              display="flex"
              justifyContent="flex-end"
              mt="20px"
              _hover={{ color: "orange.400" }}
            >
              <Button onClick={onPlaceOrder}>Place Order</Button>
            </Box>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Payment;
