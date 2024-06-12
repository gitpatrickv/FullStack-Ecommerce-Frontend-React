import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";

const SellerPage = () => {
  return (
    <Grid
      height="100vh"
      templateColumns="0.5fr 0.5fr 0.5fr"
      templateRows="0.3fr 1fr"
      templateAreas={`
        " header1 header2 header3 "
        
        "content1 content2 content3"
        
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

export default SellerPage;

{
  /* <GridItem area="header">
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
</GridItem> */
}

{
  /* <GridItem area="content7" background="black">
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              Spacer
            </Text>
          </GridItem> */
}
