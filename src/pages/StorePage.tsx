import { Box, Grid, GridItem } from "@chakra-ui/react";

const StorePage = () => {
  return (
    <Grid
      height="100vh"
      templateColumns="0.2fr 0.5fr 0.5fr 0.5fr 0.2fr"
      templateRows="0.3fr 1fr"
      templateAreas={`
        " asideLeft header1 header2 header3 asideRight"
        
        "asideLeft content1 content2 content3 asideRight"
        
      `}
    >
      <GridItem area="header1">
        <Box bg="maroon" height="100%">
          header1
        </Box>
      </GridItem>
      <GridItem area="header2">
        <Box bg="blue" height="100%">
          header2
        </Box>
      </GridItem>
      <GridItem area="header3">
        <Box bg="orange" height="100%">
          header3
        </Box>
      </GridItem>
      <GridItem area="content1">
        <Box bg="red" height="100%">
          Content 1
        </Box>
      </GridItem>
      <GridItem area="content2">
        <Box bg="green" height="100%">
          Content 2
        </Box>
      </GridItem>
      <GridItem area="content3">
        <Box bg="yellow" height="100%">
          Content 3
        </Box>
      </GridItem>
    </Grid>
  );
};

export default StorePage;
