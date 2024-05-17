import { Box, Card, CardBody, Spacer, Text } from "@chakra-ui/react";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  cartTotal: number;
}

const CartFooter = ({ cartTotal }: Props) => {
  return (
    <>
      <Card maxW="70%" position="relative" margin="auto" h="70px" mt="20px">
        <CardBody>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Spacer />
            <Text pr="20px">CART TOTAL: </Text>
            <Text>{formatCurrency(cartTotal)}</Text>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default CartFooter;
