import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  cartTotal: number;
  qty: number;
}

const OrderTotal = ({ cartTotal, qty }: Props) => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  return (
    <Card maxW="100%">
      <CardBody>
        <Grid
          templateColumns="2fr  0.5fr 0.3fr"
          templateAreas={`
  "content1 content2 content3"
`}
          alignItems="center"
        >
          <GridItem area="content2">
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              whiteSpace="nowrap"
              textAlign="end"
            >
              Order Total (
              <Text as="span" color="orange.400">
                {qty} items
              </Text>
              ):
            </Text>
          </GridItem>
          <GridItem area="content3">
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              color="orange.400"
              textAlign="end"
              pl="5px"
            >
              {formatCurrency(cartTotal)}
            </Text>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default OrderTotal;
