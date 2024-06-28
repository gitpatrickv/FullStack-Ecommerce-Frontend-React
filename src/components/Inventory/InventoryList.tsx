import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import Inventory from "../../entities/Inventory";
import { formatCurrency } from "../../utilities/formatCurrency";
import useAddStock from "../../hooks/seller/useAddStock";

interface Props {
  inventory: Inventory;
  refetchProducts: () => void;
}

const InventoryList = ({ inventory, refetchProducts }: Props) => {
  const fontSize = useBreakpointValue({ base: "md" });
  const buttonSize = useBreakpointValue({
    base: "sm",
  });
  const { register, handleSubmit, onSubmit } = useAddStock(
    inventory.inventoryId
  );

  const handleFormSubmit = async (data: { quantity: number }) => {
    try {
      await onSubmit(data);
      refetchProducts();
      onStockClose();
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  const {
    isOpen: isStockOpen,
    onOpen: onStockOpen,
    onClose: onStockClose,
  } = useDisclosure();
  return (
    <>
      <Grid
        templateColumns="0.3fr 0.3fr 0.3fr 0.3fr 0.3fr 0.3fr"
        templateAreas={`
  "content1 content2 content3 content4 content5 content6"
`}
        gap={1}
        p={3}
      >
        <GridItem area="content1">
          <Box>
            <Text fontSize={fontSize} fontWeight="semibold" ml="5px">
              {inventory.quantity}
            </Text>
          </Box>
        </GridItem>
        <GridItem area="content2">
          <Text fontSize="sm" fontWeight="semibold">
            {formatCurrency(inventory.price)}
          </Text>
        </GridItem>
        <GridItem area="content3">
          <Text fontSize={fontSize} fontWeight="semibold" ml="20px">
            {inventory.colors}
          </Text>
        </GridItem>
        <GridItem area="content4">
          <Text fontSize={fontSize} fontWeight="semibold" ml="15px">
            {inventory.sizes}
          </Text>
        </GridItem>
        <GridItem area="content5">
          <Button
            size={buttonSize}
            onClick={onStockOpen}
            _hover={{ color: "orange.400" }}
          >
            Add Stock
          </Button>
        </GridItem>
        <GridItem area="content6">
          <Button size={buttonSize} _hover={{ color: "orange.400" }}>
            Edit Price
          </Button>
        </GridItem>
      </Grid>
      <Box>
        <Modal isOpen={isStockOpen} onClose={onStockClose} size="xs" isCentered>
          <ModalOverlay />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(handleFormSubmit)(event);
            }}
          >
            <ModalContent>
              <ModalCloseButton />
              <ModalBody mt="30px">
                <Box>
                  <Text
                    fontSize={fontSize}
                    fontWeight="semibold"
                    textTransform="capitalize"
                    mb="5px"
                    color="orange.400"
                  >
                    Input Quantity
                  </Text>

                  <Input
                    {...register("quantity", { required: true })}
                    type="text"
                    placeholder="Quantity"
                    pattern="[0-9]*"
                  />
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button _hover={{ color: "orange.400" }} mr="5px" type="submit">
                  Add Stock
                </Button>
                <Button _hover={{ color: "orange.400" }} onClick={onStockClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </Box>
    </>
  );
};

export default InventoryList;
