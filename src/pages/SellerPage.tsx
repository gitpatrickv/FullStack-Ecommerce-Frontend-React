import { Box, Card, Grid, GridItem, Text } from "@chakra-ui/react";

const SellerPage = () => {
  return (
    <Grid
      height="100vh"
      templateColumns=" 0.5fr 1fr 0.8fr  "
      templateRows="0.2fr  3fr "
      templateAreas={`
      "header header header "
      
      "content1 content2 content3  "
      
    `}
    >
      <GridItem area="header">
        <Box bg="maroon" height="100%">
          header
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

export default SellerPage;

{
  /* <GridItem area="content7" background="black">
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              Spacer
            </Text>
          </GridItem> */
}
