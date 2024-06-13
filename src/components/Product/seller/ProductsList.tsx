import {
  Box,
  Card,
  Grid,
  GridItem,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

const ProductsList = () => {
  const fontSize = useBreakpointValue({ base: "sm", xl: "xl" });
  return (
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
            <Image
              w={{ base: "40px", md: "80px", lg: "100px" }}
              h={{ base: "40px", md: "60px", lg: "80px" }}
              cursor="pointer"
            />
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              textTransform="capitalize"
              // onClick={handleNavigateClick}
              cursor="pointer"
              pl="20px"
            >
              PRODUCT NAME
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
          SALES / SOLD
        </Text>
      </GridItem>
      <GridItem
        area="content3"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={fontSize} fontWeight="semibold">
          PRICE
        </Text>
      </GridItem>
      <GridItem
        area="content4"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={fontSize} fontWeight="semibold" color="orange.400">
          STOCK
        </Text>
      </GridItem>
      <GridItem
        area="content5"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Text fontSize={fontSize}>ACTION</Text>
      </GridItem>
    </Grid>
  );
};

export default ProductsList;
