import { Box, Card, CardBody, Checkbox, Text } from "@chakra-ui/react";
import { useState } from "react";
import useCartTotal from "../../hooks/useCartTotal";
import useFilterAllCarts from "../../hooks/useFilterAllCarts";

const jwtToken = localStorage.getItem("jwtToken");

interface Props {
  isChecked: boolean;
}

const CartHeader = ({ isChecked }: Props) => {
  const { mutate: filterAllCart } = useFilterAllCarts();
  const { refetch: refetchTotal } = useCartTotal(jwtToken || "");
  const [isFiltered, setIsFiltered] = useState<boolean>(isChecked);

  const handleAllFilterChange = () => {
    filterAllCart(
      { jwtToken: jwtToken || "" },
      {
        onSuccess: () => {
          refetchTotal();
        },
      }
    );
    setIsFiltered(!isFiltered);
  };

  return (
    <>
      <Card maxW="70%" position="relative" margin="auto" h="70px">
        <CardBody>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex">
              <Checkbox
                size="lg"
                colorScheme="green"
                pr="20px"
                isChecked={isFiltered}
                onChange={handleAllFilterChange}
              />
              <Text fontSize="xl" fontWeight="semibold">
                Product
              </Text>
            </Box>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              position="relative"
              left="35px"
            >
              Price
            </Text>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              position="relative"
              left="45px"
            >
              Quantity
            </Text>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              position="relative"
              left="20px"
            >
              Total Amount
            </Text>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              position="relative"
              left="-10px"
            >
              Actions
            </Text>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default CartHeader;
