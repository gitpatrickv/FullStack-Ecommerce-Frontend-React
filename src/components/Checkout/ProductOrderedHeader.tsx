import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

const ProductOrderedHeader = () => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  return (
    <Card maxW="100%" mt="5px" borderRadius="none">
      <CardBody>
        <Grid
          templateColumns="1.3fr 0.7fr 0.7fr 0.7fr"
          templateAreas={`
  "content1 content2 content3 content4"
`}
          alignItems="center"
        >
          <GridItem area="content1" textAlign="start">
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              whiteSpace="nowrap"
              pr="10px"
            >
              Products Ordered
            </Text>
          </GridItem>
          <GridItem area="content2">
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              textAlign="center"
              pr="10px"
            >
              Price
            </Text>
          </GridItem>
          <GridItem area="content3" textAlign="center">
            <Text fontSize={fontSize} fontWeight="semibold" pr="10px">
              Quantity
            </Text>
          </GridItem>
          <GridItem area="content4" textAlign="end">
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              whiteSpace="nowrap"
              pr="10px"
            >
              Item Subtotal
            </Text>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default ProductOrderedHeader;
