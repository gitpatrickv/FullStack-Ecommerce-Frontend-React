import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "../../utilities/formatCurrency";
import { FaExclamationCircle } from "react-icons/fa";

interface Props {
  cartTotal: number;
  isChecked: boolean;
  isSomeChecked: boolean;
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
  isSomeChecked,
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
  const {
    isOpen: isOpenTrue,
    onOpen: onOpenTrue,
    onClose: onCloseTrue,
  } = useDisclosure();
  const {
    isOpen: isOpenFalse,
    onOpen: onOpenFalse,
    onClose: onCloseFalse,
  } = useDisclosure();

  const cancelRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setIsFiltered(isChecked);
  }, [isChecked]);

  const handleDeleteAllCarts = () => {
    onDeleteAll();
    setIsFiltered(false);
    onCloseTrue();
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
                onClick={handleAllFilterChange}
                cursor="pointer"
                _hover={{ color: "orange.400" }}
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
                onClick={isSomeChecked ? onOpenTrue : onOpenFalse}
                _hover={{ color: "orange.400" }}
              >
                Delete
              </Text>
              {isSomeChecked ? (
                <>
                  <AlertDialog
                    isOpen={isOpenTrue}
                    leastDestructiveRef={cancelRef}
                    onClose={onCloseTrue}
                    isCentered
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          <Text color="orange.400" fontSize="large">
                            Delete Products
                          </Text>
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          <Text>Do you want to remove the {qty} products?</Text>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onCloseTrue}>
                            Cancel
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={handleDeleteAllCarts}
                            ml={3}
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </>
              ) : (
                <>
                  <AlertDialog
                    isOpen={isOpenFalse}
                    leastDestructiveRef={cancelRef}
                    onClose={onCloseFalse}
                    isCentered
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          <Box display="flex" justifyContent="center">
                            <FaExclamationCircle size="50px" color="orange" />
                          </Box>
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          <Text textAlign="center" fontSize="lg">
                            Please select product(s)
                          </Text>
                        </AlertDialogBody>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                </>
              )}

              <Text
                cursor="pointer"
                fontSize={fontSize}
                fontWeight="semibold"
                color="orange.400"
                whiteSpace="nowrap"
                onClick={isSomeChecked ? onAddToFavorites : onOpenFalse}
              >
                Add to Favorites
              </Text>
              <AlertDialog
                isOpen={isOpenFalse}
                leastDestructiveRef={cancelRef}
                onClose={onCloseFalse}
                isCentered
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      <Box display="flex" justifyContent="center">
                        <FaExclamationCircle size="50px" color="orange" />
                      </Box>
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      <Text textAlign="center" fontSize="lg">
                        Please select product(s)
                      </Text>
                    </AlertDialogBody>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
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
