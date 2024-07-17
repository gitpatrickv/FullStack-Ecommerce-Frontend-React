import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

interface Props {
  orderCount: number;
  productCount: number;
}

const BusinessInsights = ({ orderCount, productCount }: Props) => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
  });
  return (
    <Card mt="5px">
      <CardBody>
        <Grid
          templateRows="0.3fr 0.7fr"
          templateColumns="0.350fr 0.3fr 0.3fr "
          templateAreas={`
      "header header header header header"
      "content1 content2 content3 content4 content5"
  `}
          gap={4}
          p={3}
        >
          <GridItem area="header" mb="10px">
            <Text fontSize="xl" fontWeight="bold">
              Business Insights
            </Text>
            <Text color="gray.500">An overview of the shop data</Text>
          </GridItem>
          <GridItem area="content1">
            <Box display="flex" justifyContent="center" userSelect="none">
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  0
                </Text>
                <Text fontSize={fontSize} fontWeight="semibold">
                  Total Sales
                </Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem area="content2">
            <Box display="flex" justifyContent="center" userSelect="none">
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {orderCount}
                </Text>
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Total Orders
                </Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem area="content3">
            <Box display="flex" justifyContent="center" userSelect="none">
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {productCount}
                </Text>
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Products
                </Text>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default BusinessInsights;
