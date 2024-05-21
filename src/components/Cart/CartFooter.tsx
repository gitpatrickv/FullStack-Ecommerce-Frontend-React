import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  cartTotal: number;
  isChecked: boolean;
  cartItem: number;
  onDeleteAll: () => void;
  onFilterAll: () => void;
}

const CartFooter = ({
  cartTotal,
  isChecked,
  cartItem,
  onDeleteAll,
  onFilterAll,
}: Props) => {
  const [isFiltered, setIsFiltered] = useState<boolean>(isChecked);

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
    <>
      <Card
        maxW="70%"
        position="sticky"
        bottom="0.25rem"
        margin="auto"
        h="80px"
        mt="20px"
      >
        <CardBody>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Checkbox
                size="lg"
                colorScheme="green"
                pr="20px"
                isChecked={isFiltered}
                onChange={handleAllFilterChange}
              />
              <Text fontSize="xl" fontWeight="semibold" pr="3px">
                Select All
              </Text>
              <Text
                color="orange"
                fontSize="xl"
                fontWeight="semibold"
                pr="20px"
              >
                ({cartItem})
              </Text>
              <Text
                cursor="pointer"
                fontSize="xl"
                fontWeight="semibold"
                pr="20px"
                onClick={handleDeleteAllCarts}
              >
                Delete
              </Text>
              <Text
                cursor="pointer"
                fontSize="xl"
                fontWeight="semibold"
                color="orange"
              >
                Add to Favorites
              </Text>
            </Box>
            <Spacer />
            <Box display="flex" justifyContent="center">
              <Text pr="20px" fontSize="x-large" fontWeight="semibold">
                CART TOTAL :
              </Text>
              <Text
                fontSize="x-large"
                pr="60px"
                color="orange"
                fontWeight="semibold"
              >
                {formatCurrency(cartTotal)}
              </Text>
              <Button>Checkout</Button>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default CartFooter;
