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
            <Text
              fontSize="xl"
              fontWeight="semibold"
              lineHeight="short"
              textTransform="uppercase"
            >
              Shop Name
            </Text>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              lineHeight="short"
              textTransform="uppercase"
            >
              Product
            </Text>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              lineHeight="short"
              textTransform="uppercase"
            >
              Quantity
            </Text>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              lineHeight="short"
              textTransform="uppercase"
            >
              Price
            </Text>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              lineHeight="short"
              textTransform="uppercase"
            >
              Total Amount
            </Text>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default CartHeader;
