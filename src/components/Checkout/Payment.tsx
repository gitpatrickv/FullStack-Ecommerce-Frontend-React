import { Box, Button, Card, CardBody, Spacer, Text } from "@chakra-ui/react";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  cartTotal: number;
}

const Payment = ({ cartTotal }: Props) => {
  return (
    <Card maxW={{ base: "100%", lg: "70%" }} margin="auto" mt="5px">
      <CardBody>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold">
            Payment Method
          </Text>
          <Spacer />
          <Text pr="60px" fontSize={["sm", "md", "lg"]} fontWeight="semibold">
            Cash On Delivery
          </Text>
          <Text
            color="orange"
            fontSize={["sm", "md", "lg"]}
            fontWeight="semibold"
            cursor="pointer"
          >
            Change
          </Text>
        </Box>
        <Box display="flex" justifyContent="end" flexWrap="wrap">
          <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold" pr="45px">
            Merchandise Subtotal:
          </Text>
          <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold">
            ₱1234.00
          </Text>
        </Box>
        <Box display="flex" justifyContent="end">
          <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold" pr="45px">
            Shipping Total:
          </Text>
          <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold">
            ₱1234.00
          </Text>
        </Box>
        <Box display="flex" justifyContent="end">
          <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold" pr="45px">
            Total Payment:
          </Text>
          <Text
            fontSize={["sm", "md", "lg"]}
            fontWeight="semibold"
            color="orange"
          >
            {formatCurrency(cartTotal)}
          </Text>
        </Box>
        <Box display="flex" justifyContent="end" alignItems="center" pt="20px">
          <Button>Place Order</Button>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Payment;
