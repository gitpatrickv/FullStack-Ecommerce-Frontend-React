import { Box, Card, CardBody, Text } from "@chakra-ui/react";

const ProductOrderedHeader = () => {
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
            Products Ordered
          </Text>
          <Text
            fontSize={["sm", "md", "lg"]}
            fontWeight="semibold"
            position="relative"
            left={{
              base: "0px",
              sm: "20px",
              md: "40px",
              lg: "80px",
              xl: "170px",
            }}
          >
            Price
          </Text>
          <Text
            fontSize={["sm", "md", "lg"]}
            fontWeight="semibold"
            position="relative"
            left={{
              base: "0px",
              sm: "20px",
              md: "40px",
              lg: "80px",
              xl: "120px",
            }}
          >
            Quantity
          </Text>
          <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold">
            Item Subtotal
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ProductOrderedHeader;
