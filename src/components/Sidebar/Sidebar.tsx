import { Box, Grid, GridItem, Text } from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <Grid
      height="100vh"
      templateColumns="0.2fr 1fr 0.2fr"
      templateRows="0fr 1fr"
      templateAreas={`
  "header header header"
  "sidebar content1 sidebar1"
`}
    >
      <GridItem area="sidebar">
        <Box bg="gray" height="100%">
          <Text>Order</Text>
          <Text>Order</Text>
          <Text>Order</Text>
          <Text>Order</Text>
          <Text>Order</Text>
          <Text>Order</Text>
          <Text>Order</Text>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Sidebar;
