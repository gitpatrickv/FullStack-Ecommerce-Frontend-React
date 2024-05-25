import { Card, Grid, GridItem, Text } from "@chakra-ui/react";

const SellerPage = () => {
  return (
    <Card maxW="75%" margin="auto">
      <Grid
        templateColumns="1fr 2fr 1fr"
        templateRows="0.2fr 0.4fr"
        templateAreas={`
    "content1 content2 content3"
    "content4 content5 content6"
`}
        alignItems="center"
      >
        <GridItem area="content1" background="red">
          <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
            logo
          </Text>
        </GridItem>
        <GridItem area="content2" background="blue">
          <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
            space
          </Text>
        </GridItem>
        <GridItem area="content3" background="green">
          <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
            login register
          </Text>
        </GridItem>
        <GridItem area="content4" background="orange">
          <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
            home
          </Text>
        </GridItem>{" "}
        <GridItem area="content5" background="skyblue">
          <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
            search input
          </Text>
        </GridItem>
        <GridItem area="content6" background="brown">
          <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
            cart logo
          </Text>
        </GridItem>
      </Grid>
    </Card>
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
