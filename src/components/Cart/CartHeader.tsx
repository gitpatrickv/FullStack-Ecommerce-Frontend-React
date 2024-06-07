import {
  Box,
  Card,
  CardBody,
  Checkbox,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  isChecked: boolean;
  onFilterAll: () => void;
  cartItem: number;
}

const CartHeader = ({ isChecked, onFilterAll, cartItem }: Props) => {
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

  const handleAllFilterChange = () => {
    onFilterAll();
    setIsFiltered(!isFiltered);
  };

  return (
    <>
      {cartItem === 0 ? (
        ""
      ) : (
        <Card maxW="100%">
          <CardBody>
            <Grid
              templateColumns="1fr 0.5fr 0.5fr 0.5fr 0.5fr"
              templateAreas={`
    "content1 content2 content3 content4 content5"
`}
            >
              <GridItem area="content1">
                <Box display="flex" alignItems="center">
                  <Checkbox
                    size={checkboxSize}
                    colorScheme="green"
                    position="absolute"
                    top="26px"
                    left="32px"
                    pr="20px"
                    isChecked={isFiltered}
                    onChange={handleAllFilterChange}
                  />
                  <Text
                    fontSize={fontSize}
                    fontWeight="semibold"
                    position="relative"
                    left="52px"
                  >
                    Product
                  </Text>
                </Box>
              </GridItem>
              <GridItem
                area="content2"
                alignItems="center"
                display="flex"
                justifyContent="center"
              >
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  position="relative"
                  left="-15px"
                >
                  Price
                </Text>
              </GridItem>
              <GridItem
                area="content3"
                alignItems="center"
                display="flex"
                justifyContent="center"
              >
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  position="relative"
                  left="-15px"
                >
                  Quantity
                </Text>
              </GridItem>
              <GridItem
                area="content4"
                alignItems="center"
                display="flex"
                justifyContent="center"
              >
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  position="relative"
                  left="-15px"
                >
                  Total
                </Text>
              </GridItem>
              <GridItem
                area="content5"
                alignItems="center"
                display="flex"
                justifyContent="flex-end"
              >
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  position="absolute"
                  right="42px"
                >
                  Actions
                </Text>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default CartHeader;
