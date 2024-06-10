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
      templateColumns=" 1.5fr 0.5fr "
      templateAreas={`
      "header header header "
      
      "content1 content2"
      
    `}
    >
      <Card>
        <GridItem area="content1">
          <Image
            src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
            w="100px"
          />
          <Text>asdasd</Text>
        </GridItem>
      </Card>
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
