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
    <Card mb="5px" padding={2} borderRadius="none">
      <Grid
        templateColumns="1fr 0.3fr 0.3fr 0.3fr 0.3fr"
        templateAreas={`
"content1 content2 content3 content4 content5"
`}
        gap={4}
        p={3}
      >
        <GridItem area="content1">
          <Box
            display="flex"
            alignItems="center"
            w={{ base: "150px", md: "250px", lg: "350px" }}
          >
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              cursor="pointer"
              pl="5px"
              color="orange.400"
            >
              Products
            </Text>
          </Box>
        </GridItem>
        <GridItem
          area="content2"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box minWidth="60px">
            <Text fontSize={fontSize} fontWeight="semibold" color="orange.400">
              Sold
            </Text>
          </Box>
        </GridItem>
        <GridItem
          area="content3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box minWidth="60px">
            <Text fontSize={fontSize} fontWeight="semibold" color="orange.400">
              Price
            </Text>
          </Box>
        </GridItem>
        <GridItem
          area="content4"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box minWidth="60px">
            <Text fontSize={fontSize} fontWeight="semibold" color="orange.400">
              Stock
            </Text>
          </Box>
        </GridItem>
        <GridItem
          area="content5"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          mr="25px"
        >
          <Text fontSize={fontSize} fontWeight="semibold" color="orange.400">
            Action
          </Text>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ProductListHeader;
