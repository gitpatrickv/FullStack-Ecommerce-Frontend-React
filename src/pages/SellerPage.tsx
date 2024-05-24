import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";

const SellerPage = () => {
  return (
    <Card maxW="75%" margin="auto">
      <CardBody>
        <Grid
          templateColumns="2fr  0.5fr 0.4fr"
          templateAreas={`
  "content1 content2 content3"
`}
          alignItems="center"
        >
          <GridItem area="content1" background="red">
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              Payment Method
            </Text>
          </GridItem>
          <GridItem area="content2" background="blue">
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              Order Total (34 items):
            </Text>
          </GridItem>
          <GridItem area="content3" background="green">
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              P1,000,000.00
            </Text>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default SellerPage;

{
  /* <GridItem area="content4" background="orange">
<Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
  Item Subtotal
</Text>
</GridItem> */
}
{
  /* <GridItem area="content5" background="skyblue">
<Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
  <Button>Checkout</Button>
</Text>
</GridItem> */
}
{
  /* <GridItem area="content6" background="brown">
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              Actions
            </Text>
          </GridItem> */
}
{
  /* <GridItem area="content7" background="black">
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              Spacer
            </Text>
          </GridItem> */
}
