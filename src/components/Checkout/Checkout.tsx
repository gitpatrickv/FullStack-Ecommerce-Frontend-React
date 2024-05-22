import { Box, Card, CardBody, HStack, Image, Text } from "@chakra-ui/react";

const Checkout = () => {
  return (
    <Card maxW="70%" margin="auto">
      <CardBody>
        <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold">
          ShopName
        </Text>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Image
              src=""
              w={{ base: "20px", md: "50px", lg: "100px" }}
              boxSize={{ base: "20px", md: "50px", lg: "100px" }}
            ></Image>
            <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold" pl="10px">
              Products Name
            </Text>
          </Box>
          <HStack
            spacing={{
              base: "0px",
              sm: "5px",
              md: "50px",
              lg: "60px",
              xl: "250px",
            }}
            display="flex"
            flexWrap="wrap"
          >
            <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold">
              Price
            </Text>
            <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold">
              Quantity
            </Text>
            <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold">
              Total
            </Text>
          </HStack>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Checkout;
