import {
  Box,
  Card,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

const ProductListHeader = () => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  return (
    <Card>
      <Grid
        templateColumns="1fr 0.5fr 0.5fr 0.5fr 0.5fr"
        templateAreas={`
"content1 content2 content3 content4 content5"
`}
        gap={4}
        p={3}
      >
        <GridItem area="content1">
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Box display="flex" alignItems="center">
              <Text
                fontSize={fontSize}
                fontWeight="semibold"
                // onClick={handleNavigateClick}
                cursor="pointer"
                pl="20px"
              >
                Product(s)
              </Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem
          area="content2"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={fontSize} fontWeight="semibold">
            Sales
          </Text>
        </GridItem>
        <GridItem
          area="content3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={fontSize} fontWeight="semibold">
            Price
          </Text>
        </GridItem>
        <GridItem
          area="content4"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={fontSize} fontWeight="semibold" color="orange.400">
            Stock
          </Text>
        </GridItem>
        <GridItem
          area="content5"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Text fontSize={fontSize}>Action</Text>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ProductListHeader;
