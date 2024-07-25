import { Box, Card, Grid, GridItem, Text } from "@chakra-ui/react";
import { Order } from "../../../entities/Order";
import { formatCurrency } from "../../../utilities/formatCurrency";

interface Props {
  order: Order;
}

const LatestOrders = ({ order }: Props) => {
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
            <Text ml="5px" textTransform="capitalize">
              {order.fullName}
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
            <Text textTransform="capitalize">{order.shopName}</Text>
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
            <Text>{formatCurrency(order.orderTotalAmount)}</Text>
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
            <Text>{order.paymentMethod}</Text>
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
            <Box
              border="1px solid"
              width="120px"
              textAlign="center"
              borderRadius="20px"
              bg={
                order.orderStatus === "CANCELLED"
                  ? "red.500"
                  : order.orderStatus === "COMPLETED"
                  ? "green"
                  : order.orderStatus === "RATED"
                  ? "orange.500"
                  : order.orderStatus === "PENDING"
                  ? "blue.500"
                  : order.orderStatus === "TO PAY"
                  ? "blue.900"
                  : order.orderStatus === "TO SHIP"
                  ? "purple"
                  : order.orderStatus === "TO RECEIVE"
                  ? "pink.500"
                  : ""
              }
              borderColor={
                order.orderStatus === "CANCELLED"
                  ? "red.500"
                  : order.orderStatus === "COMPLETED"
                  ? "green"
                  : order.orderStatus === "RATED"
                  ? "orange.500"
                  : order.orderStatus === "PENDING"
                  ? "blue.500"
                  : order.orderStatus === "TO PAY"
                  ? "blue.900"
                  : order.orderStatus === "TO SHIP"
                  ? "purple"
                  : order.orderStatus === "TO RECEIVE"
                  ? "pink.500"
                  : ""
              }
              ml="10px"
            >
              <Text>{order.orderStatus}</Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem area="f">
          <Box
            display="flex"
            justifyContent="center"
            minWidth="200px"
            mt="10px"
          >
            <Text>{order.createdDate}</Text>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default LatestOrders;
