import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";

import OrderItem from "../../entities/Order";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  order: OrderItem;
}

const SellersOrderCard = ({ order }: Props) => {
  return (
    <Grid
      templateRows="1fr "
      templateColumns="0.7fr 0.3fr "
      templateAreas={`
"content1 content2"
`}
      alignItems="center"
      p={1}
    >
      <GridItem area="content1" mt="3px">
        <Box display="flex" alignItems="center" pb="10px">
          <Image
            src={order.photoUrl}
            w={{ base: "50px", md: "90px", lg: "120px" }}
            h={{ base: "40px", md: "60px", lg: "80px" }}
            border="solid 1px"
          />
          <Box display="flex" flexDirection="column" pl="10px">
            <Text pl="5px" textTransform="capitalize">
              {order.productName}
            </Text>
            <Text pl="5px">x{order.quantity}</Text>
            {order.colors || order.sizes ? (
              <Text
                fontSize="sm"
                fontWeight="semibold"
                textTransform="capitalize"
                cursor="pointer"
                color="gray.500"
                pl="5px"
              >
                Variation: {order.colors},{order.sizes}
              </Text>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </GridItem>
      <GridItem area="content2">
        <Box display="flex" justifyContent="end">
          <Text>{formatCurrency(order.price)}</Text>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default SellersOrderCard;
