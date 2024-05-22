import {
  Box,
  Card,
  CardBody,
  Checkbox,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
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

  const checkboxSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

  return (
    <Card
      maxW={{ base: "100%", lg: "70%" }}
      position="relative"
      margin="auto"
      h="70px"
    >
      <CardBody>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box display="flex">
            <Checkbox
              size={checkboxSize}
              colorScheme="green"
              pr="20px"
              isChecked={isFiltered}
              onChange={handleAllFilterChange}
            />
            <Text fontSize={["sm", "md", "lg", "xl"]} fontWeight="semibold">
              Product
            </Text>
          </Box>
          <Text
            fontSize={["sm", "md", "lg", "xl"]}
            fontWeight="semibold"
            position="relative"
            left={{
              base: "0px",
              sm: "5px",
              md: "10px",
              lg: "100px",
              xl: "150px",
            }}
          >
            Price
          </Text>
          <Text
            fontSize={["sm", "md", "lg", "xl"]}
            fontWeight="semibold"
            position="relative"
            left={{
              base: "0px",
              sm: "20px",
              md: "40px",
              lg: "80px",
              xl: "120px",
            }}
          >
            Quantity
          </Text>
          <Text
            fontSize={["sm", "md", "lg", "xl"]}
            fontWeight="semibold"
            position="relative"
            left={{ base: "0", lg: "40px", xl: "50px" }}
          >
            Total Amount
          </Text>
          <Text
            fontSize={["sm", "md", "lg", "xl"]}
            fontWeight="semibold"
            position="relative"
            left="-5px"
          >
            Actions
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default CartHeader;
