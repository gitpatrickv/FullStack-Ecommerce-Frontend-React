import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  cartTotal: number;
  isChecked: boolean;
  cartItem: number;
  qty: number;
  onDeleteAll: () => void;
  onFilterAll: () => void;
  onCheckout: () => void;
  onAddToFavorites: () => void;
}

const CartFooter = ({
  cartTotal,
  isChecked,
  cartItem,
  qty,
  onDeleteAll,
  onFilterAll,
  onCheckout,
  onAddToFavorites,
}: Props) => {
  const [isFiltered, setIsFiltered] = useState<boolean>(isChecked);
  const checkboxSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  useEffect(() => {
    setIsFiltered(isChecked);
  }, [isChecked]);

  const handleDeleteAllCarts = () => {
    onDeleteAll();
    setIsFiltered(!isFiltered);
  };

  const handleAllFilterChange = () => {
    onFilterAll();
    setIsFiltered(!isFiltered);
  };

  return (
    <Card
      maxW="100%"
      position="sticky"
      bottom="0.25rem"
      margin="auto"
      h="80px"
      mt="5px"
    >
      <CardBody>
        <Grid
          templateColumns="1fr 0.5fr 1fr"
          templateAreas={`
  "content1  content4  content2"
`}
          alignItems="center"
          display="flex"
          justifyContent="space-between"
        >
          <GridItem area="content1" pr="10px">
            <Box display="flex" alignItems="center">
              <Checkbox
                size={checkboxSize}
                colorScheme="green"
                pr="30px"
                isChecked={isFiltered}
                onChange={handleAllFilterChange}
                position="relative"
                left="12px"
              />
              <Text
                fontSize={fontSize}
                fontWeight="semibold"
                pr="3px"
                whiteSpace="nowrap"
              >
                Select All
              </Text>
              <Text
                color="orange.400"
                fontSize={fontSize}
                fontWeight="semibold"
                pr="20px"
              >
                ({cartItem})
              </Text>
              <Text
                cursor="pointer"
                fontSize={fontSize}
                fontWeight="semibold"
                pr="20px"
                onClick={handleDeleteAllCarts}
                _hover={{ color: "orange.400" }}
              >
                Delete
              </Text>
              <Text
                cursor="pointer"
                fontSize={fontSize}
                fontWeight="semibold"
                color="orange.400"
                whiteSpace="nowrap"
                onClick={onAddToFavorites}
              >
                Add to Favorites
              </Text>
            </Box>
          </GridItem>

          <GridItem area="content2">
            <Box display="flex" alignItems="center">
              <Text
                fontSize={fontSize}
                fontWeight="semibold"
                whiteSpace="nowrap"
                pr="7px"
              >
                Total (
                <Text as="span" color="orange.400">
                  {qty} items
                </Text>
                ):
              </Text>
              <Text
                fontSize={fontSize}
                color="orange.400"
                fontWeight="semibold"
                pr="25px"
              >
                {formatCurrency(cartTotal)}
              </Text>

              <Button onClick={onCheckout} _hover={{ color: "orange.400" }}>
                <Text fontSize={fontSize}>Check Out</Text>
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default CartFooter;
