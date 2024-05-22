import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  cartTotal: number;
  qty: number;
}

const OrderTotal = ({ cartTotal, qty }: Props) => {
  return (
    <Card maxW={{ base: "100%", lg: "70%" }} margin="auto">
      <CardBody>
        <Box display="flex" justifyContent="end">
          <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold" pr="45px">
            Order Total (
            <Text as="span" color="orange">
              {qty} items
            </Text>
            ):
          </Text>
          <Text
            fontSize={["sm", "md", "lg"]}
            fontWeight="semibold"
            color="orange"
          >
            {formatCurrency(cartTotal)}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default OrderTotal;
