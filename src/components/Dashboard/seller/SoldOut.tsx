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
  useDisclosure,
} from "@chakra-ui/react";
import Inventory from "../../../entities/Inventory";
import useAddStock from "../../../hooks/seller/useAddStock";

interface Props {
  inventory: Inventory;
}

const SoldOut = ({ inventory }: Props) => {
  const { register, handleSubmit, onSubmit } = useAddStock(
    inventory.inventoryId
  );

  const {
    isOpen: isStockOpen,
    onOpen: onStockOpen,
    onClose: onStockClose,
  } = useDisclosure();

  const handleFormSubmit = async (data: { quantity: number }) => {
    try {
      await onSubmit(data);
      onStockClose();
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  return (
    <Grid
      templateColumns="0.3fr 0.2fr 0.2fr 0.2fr 0.2fr"
      templateAreas={`
"content1 content2 content3 content4 content5"
`}
      p={3}
      alignItems="center"
    >
      <GridItem area="content1">
        <Box>
          <Text fontSize="sm" fontWeight="semibold">
            {inventory.productName}
          </Text>
        </Box>
      </GridItem>
      <GridItem area="content2" display="flex" justifyContent="center">
        <Text fontSize="sm" fontWeight="semibold">
          {inventory.quantity}
        </Text>
      </GridItem>
      <GridItem area="content3" display="flex" justifyContent="center">
        <Text fontSize="sm" fontWeight="semibold">
          {inventory.colors}
        </Text>
      </GridItem>
      <GridItem area="content4" display="flex" justifyContent="center">
        <Text fontSize="sm" fontWeight="semibold">
          {inventory.sizes}
        </Text>
      </GridItem>
      <GridItem area="content5" display="flex" justifyContent="center">
        <Text
          fontSize="sm"
          _hover={{ color: "orange.400" }}
          fontWeight="semibold"
          cursor="pointer"
          onClick={onStockOpen}
        >
          Add Stock
        </Text>
        <Box>
          <Modal
            isOpen={isStockOpen}
            onClose={onStockClose}
            size="xs"
            isCentered
          >
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
                      fontWeight="semibold"
                      textTransform="capitalize"
                      mb="5px"
                      color="white.500"
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
                  <Button
                    _hover={{ color: "orange.400" }}
                    onClick={onStockClose}
                  >
                    Close
                  </Button>
                  <Button
                    ml="5px"
                    type="submit"
                    bg="orange.500"
                    _hover={{ bg: "orange.600" }}
                  >
                    Add Stock
                  </Button>
                </ModalFooter>
              </ModalContent>
            </form>
          </Modal>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default SoldOut;
