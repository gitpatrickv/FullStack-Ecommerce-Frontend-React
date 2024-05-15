import { Box, Card, CardBody, Text } from "@chakra-ui/react";

const CartHeader = () => {
  return (
    <>
      <Card maxW="70%" position="relative" margin="auto" h="70px">
        <CardBody>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="xl" fontWeight="semibold">
              Shop Name
            </Text>
            <Text fontSize="xl" fontWeight="semibold">
              Product
            </Text>
            <Text fontSize="xl" fontWeight="semibold">
              Quantity
            </Text>
            <Text fontSize="xl" fontWeight="semibold">
              Price
            </Text>
            <Text fontSize="xl" fontWeight="semibold">
              Total Amount
            </Text>
            <Text fontSize="xl" fontWeight="semibold">
              Actions
            </Text>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default CartHeader;
