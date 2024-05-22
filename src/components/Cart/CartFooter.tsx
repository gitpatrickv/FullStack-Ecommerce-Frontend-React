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
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  cartTotal: number;
  isChecked: boolean;
  cartItem: number;
  qty: number;
  onDeleteAll: () => void;
  onFilterAll: () => void;
}

const CartFooter = ({
  cartTotal,
  isChecked,
  cartItem,
  qty,
  onDeleteAll,
  onFilterAll,
}: Props) => {
  const [isFiltered, setIsFiltered] = useState<boolean>(isChecked);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFiltered(isChecked);
  }, [isChecked]);

  const handleNavigateCheckoutClick = () => {
    navigate("/checkout");
  };

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
      maxW={{ base: "100%", lg: "70%" }}
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
          flexWrap="wrap"
        >
          <Box display="flex" alignItems="center">
            <Checkbox
              size="lg"
              colorScheme="green"
              pr="20px"
              isChecked={isFiltered}
              onChange={handleAllFilterChange}
            />
            <Text
              fontSize={{ base: "sm", lg: "xl" }}
              fontWeight="semibold"
              pr="3px"
            >
              Select All
            </Text>
            <Text
              color="orange"
              fontSize={{ base: "sm", lg: "xl" }}
              fontWeight="semibold"
              pr="20px"
            >
              ({cartItem})
            </Text>
            <Text
              cursor="pointer"
              fontSize={{ base: "sm", lg: "xl" }}
              fontWeight="semibold"
              pr="20px"
              onClick={handleDeleteAllCarts}
            >
              Delete
            </Text>
            <Text
              cursor="pointer"
              fontSize={{ base: "sm", lg: "xl" }}
              fontWeight="semibold"
              color="orange"
            >
              Add to Favorites
            </Text>
          </Box>
          <Spacer />
          <Box display="flex" justifyContent="center" alignItems="center">
            <Text
              pr="20px"
              fontSize={{ base: "sm", lg: "xl" }}
              fontWeight="semibold"
            >
              Total (
              <Text as="span" color="orange">
                {qty} items
              </Text>
              ):
            </Text>
            <Text
              fontSize={{ base: "sm", lg: "xl" }}
              pr="60px"
              color="orange"
              fontWeight="semibold"
            >
              {formatCurrency(cartTotal)}
            </Text>
            <Button onClick={handleNavigateCheckoutClick}>Check Out</Button>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default CartFooter;
