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
          templateColumns="0.4fr 0.2fr 0.4fr 1.3fr 0.650fr 0.3fr"
          templateAreas={`
  "content1 content2 content3 content7 content4  content5"
`}
        >
          <GridItem area="content1">
            <Box display="flex" textAlign="center">
              <Checkbox
                size="lg"
                colorScheme="green"
                position="relative"
                right="-5px"
                top="2px"
                pr="20px"
              />
              <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
                Select All(10)
              </Text>
            </Box>
          </GridItem>
          <GridItem area="content2" background="blue">
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              Delete
            </Text>
          </GridItem>
          <GridItem area="content3" background="green">
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              Add to Favorites
            </Text>
          </GridItem>
          <GridItem area="content4" background="orange">
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              Total (0 items): ₱2000000.00
            </Text>
          </GridItem>
          <GridItem area="content5" background="skyblue">
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              <Button>Checkout</Button>
            </Text>
          </GridItem>
          {/* <GridItem area="content6" background="brown">
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              Actions
            </Text>
          </GridItem> */}
          <GridItem area="content7" background="black">
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              Spacer
            </Text>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default SellerPage;
