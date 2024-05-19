import { Box, Card, CardBody, Checkbox, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  isChecked: boolean;
  onFilterAll: () => void;
}

const CartHeader = ({ isChecked, onFilterAll }: Props) => {
  const [isFiltered, setIsFiltered] = useState<boolean>(isChecked);

  useEffect(() => {
    setIsFiltered(isChecked);
  }, [isChecked]);

  const handleAllFilterChange = () => {
    onFilterAll();
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
