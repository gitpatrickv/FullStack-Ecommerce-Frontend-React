import { Box, Card, Grid, GridItem, Text } from "@chakra-ui/react";

const LatestOrders = () => {
  return (
    <Card borderRadius="none" mb="1px" mt="5px">
      <Grid
        templateColumns="0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr"
        templateAreas={`
"a b c d e f"
`}
        padding={1}
      >
        <GridItem area="a">
          <Box display="flex" ml="10px" mt="10px" mb="10px" minWidth="200px">
            <Text ml="5px">ORDER BY</Text>
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
            <Text>ORDER FROM</Text>
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
            <Text>TOTAL ORDER</Text>
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
            <Text>PAYMENT METHOD</Text>
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
            <Text>ORDER STATUS</Text>
          </Box>
        </GridItem>
        <GridItem area="f">
          <Box
            display="flex"
            justifyContent="center"
            minWidth="200px"
            mt="10px"
          >
            <Text>ORDER DATE</Text>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default LatestOrders;
