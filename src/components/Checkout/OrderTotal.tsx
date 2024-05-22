import { Box, Card, CardBody, Text } from "@chakra-ui/react";

const OrderTotal = () => {
  return (
    <Card maxW="70%" margin="auto">
      <CardBody>
        <Box display="flex" justifyContent="end">
          <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold" pr="45px">
            Order Total <Text as="span">(1 item)</Text>
          </Text>
          <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold">
            ₱1234.00
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default OrderTotal;
