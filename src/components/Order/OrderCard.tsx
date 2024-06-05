import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";

import Order from "../../entities/Order";

interface Props {
  order: Order;
}

const OrderCard = ({ order }: Props) => {
  return (
    <Grid
      templateRows="1fr "
      templateColumns="1.5fr 0.5fr "
      templateAreas={`
"content1 content2"
`}
      alignItems="center"
      p={1}
    >
      <GridItem area="content1" mt="3px">
        <Box display="flex" alignItems="center">
          <Image
            src={order.photoUrl}
            w={{ base: "50px", md: "90px", lg: "120px" }}
            h={{ base: "40px", md: "60px", lg: "80px" }}
          />
          <Box display="flex" flexDirection="column" pl="10px">
            <Text pl="5px" textTransform="capitalize">
              {order.productName}
            </Text>
            <Text pl="5px">x{order.quantity}</Text>
          </Box>
        </Box>
      </GridItem>
      <GridItem area="content2">
        <Box display="flex" justifyContent="end">
          <Text>{order.price}</Text>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default OrderCard;
