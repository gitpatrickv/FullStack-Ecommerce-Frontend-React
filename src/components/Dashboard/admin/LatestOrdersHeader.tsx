import { Box, Card, Grid, GridItem, Text } from "@chakra-ui/react";

const LatestOrdersHeader = () => {
  return (
    <Card borderRadius="none" mb="1px">
      <Grid
        templateColumns="0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr"
        templateAreas={`
"a b c d e f"
`}
        padding={1}
      >
        <GridItem area="a">
          <Box
            display="flex"
            ml="10px"
            mt="10px"
            mb="10px"
            minWidth="200px"
            justifyContent="center"
          >
            <Text ml="5px" fontSize="lg" fontWeight="semibold">
              Ordered By
            </Text>
          </Box>
        </GridItem>
        <GridItem area="b">
          <Box
            mt="10px"
            mb="10px"
            display="flex"
            justifyContent="center"
            minWidth="200px"
          >
            <Text fontSize="lg" fontWeight="semibold">
              Shop Name
            </Text>
          </Box>
        </GridItem>
        <GridItem area="c">
          <Box
            mt="10px"
            mb="10px"
            display="flex"
            justifyContent="center"
            minWidth="200px"
          >
            <Text fontSize="lg" fontWeight="semibold">
              Total Amount
            </Text>
          </Box>
        </GridItem>
        <GridItem area="d">
          <Box
            mt="10px"
            mb="10px"
            display="flex"
            justifyContent="center"
            minWidth="200px"
          >
            <Text fontSize="lg" fontWeight="semibold">
              Payment Method
            </Text>
          </Box>
        </GridItem>
        <GridItem area="e">
          <Box
            mt="10px"
            mb="10px"
            display="flex"
            justifyContent="center"
            minWidth="200px"
          >
            <Text fontSize="lg" fontWeight="semibold">
              Status
            </Text>
          </Box>
        </GridItem>
        <GridItem area="f">
          <Box
            display="flex"
            justifyContent="center"
            minWidth="200px"
            mt="10px"
          >
            <Text fontSize="lg" fontWeight="semibold">
              Date
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default LatestOrdersHeader;
