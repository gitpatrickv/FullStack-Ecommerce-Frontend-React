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
  Divider,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Textarea,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import AllProductModels from "../../../entities/AllProductResponse";
import useDeleteProduct from "../../../hooks/seller/useDeleteProduct";
import useUpdateProductInfo, {
  UpdateProductInfoProps,
} from "../../../hooks/seller/useUpdateProductInfo";
import { useAuthQueryStore } from "../../../store/auth-store";
import { formatCurrency } from "../../../utilities/formatCurrency";
import InventoryList from "../../Inventory/InventoryList";
interface Props {
  product: AllProductModels;
  refetchProducts: () => void;
}

const ProductsList = ({ product, refetchProducts }: Props) => {
  const fontSize = useBreakpointValue({ base: "sm", xl: "xl" });
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { mutate: deleteProduct } = useDeleteProduct();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { onSubmit } = useUpdateProductInfo(product.productId);
  const { register, handleSubmit } = useForm<UpdateProductInfoProps>({
    defaultValues: {
      productName: product.productName,
      productDescription: product.productDescription,
    },
  });

  const {
    isOpen: isProductInfoOpen,
    onOpen: onProductInfoOpen,
    onClose: onProductInfoClose,
  } = useDisclosure();

  const {
    isOpen: updateIsOpen,
    onOpen: updateOnOpen,
    onClose: updateOnClose,
  } = useDisclosure();

  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();

  const handleProductInfoSubmit = async (data: {
    productName: string;
    productDescription: string;
  }) => {
    try {
      await onSubmit(data);
      refetchProducts();
      onProductInfoClose();
    } catch (error) {
      console.error("Error updating product info: ", error);
    }
  };

  const handleDeleteProductClick = () => {
    deleteProduct(
      {
        jwtToken: jwtToken,
        productId: product.productId,
      },
      {
        onSuccess: () => {
          refetchProducts();
        },
      }
    );
  };

  return (
    <Card mb="5px" padding={2} borderRadius="none">
      <Grid
        templateColumns="1fr 0.3fr 0.3fr 0.3fr 0.3fr"
        templateAreas={`
  "content1 content2 content3 content4 content5"
`}
        gap={4}
        p={3}
      >
        <GridItem area="content1">
          <Box
            display="flex"
            alignItems="center"
            w={{ base: "150px", md: "250px", lg: "350px" }}
          >
            <Image
              src={product.photoUrl}
              w={{ base: "40px", md: "80px", lg: "100px" }}
              h={{ base: "40px", md: "60px", lg: "80px" }}
              cursor="pointer"
              border="1px solid"
            />
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              textTransform="capitalize"
              cursor="pointer"
              pl="20px"
            >
              {product.productName}
            </Text>
          </Box>
        </GridItem>
        <GridItem
          area="content2"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box minWidth="60px">
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              display="flex"
              justifyContent="center"
              mr="10px"
            >
              {product.productSold}
            </Text>
          </Box>
        </GridItem>
        <GridItem
          area="content3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box minWidth="60px" display="flex" justifyContent="center">
            <Text fontSize={fontSize} fontWeight="semibold">
              {formatCurrency(product.price)}
            </Text>
          </Box>
        </GridItem>
        <GridItem
          area="content4"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box minWidth="60px" display="flex" justifyContent="center">
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              color={product.quantity > 0 ? "white.500" : "red"}
            >
              {product.quantity}
            </Text>
          </Box>
        </GridItem>
        <GridItem
          area="content5"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Box display="flex" flexDirection="column" justifyContent="flex-end">
            <Box
              mb="5px"
              height="35px"
              width="100px"
              border="1px solid"
              borderColor="gray.600"
              textAlign="center"
              cursor="pointer"
              userSelect="none"
              _hover={{
                borderColor: "orange.500",
                transform: "scale(1.03)",
                transition: "transform .15s ease-in",
              }}
              onClick={updateOnOpen}
            >
              <Text position="relative" top="4px">
                Update
              </Text>
            </Box>
            <Box
              height="35px"
              width="100px"
              border="1px solid"
              borderColor="gray.600"
              textAlign="center"
              cursor="pointer"
              userSelect="none"
              _hover={{
                borderColor: "orange.500",
                transform: "scale(1.03)",
                transition: "transform .15s ease-in",
              }}
              onClick={deleteOnOpen}
            >
              <Text position="relative" top="4px">
                Delete
              </Text>
            </Box>
          </Box>
        </GridItem>
      </Grid>
      <Box>
        <Modal
          isOpen={updateIsOpen}
          onClose={updateOnClose}
          size="xl"
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody mt="30px">
              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display="flex" flexDirection="column">
                    <Box display="flex" alignItems="center">
                      <Text
                        fontSize={fontSize}
                        fontWeight="semibold"
                        textTransform="capitalize"
                        mb="5px"
                        color="orange.400"
                        mr="10px"
                      >
                        {product.productName}
                      </Text>
                      <Box pb="5px" cursor="pointer" color="gray.500">
                        <FaRegEdit size="20" onClick={onProductInfoOpen} />
                      </Box>
                    </Box>
                    <Text
                      fontSize="small"
                      textTransform="capitalize"
                      mb="5px"
                      color="gray.400"
                    >
                      {product.productDescription}
                    </Text>
                  </Box>
                  <Box position="relative" top="-5px" pl="10px">
                    <Image
                      src={product.photoUrl}
                      maxWidth="100px"
                      maxHeight="60px"
                      mr="40px"
                      border="1px solid"
                    />
                  </Box>
                </Box>
                <Divider mt="5px" />
                <Box>
                  <Grid
                    templateColumns="0.2fr 0.3fr 0.4fr 0.3fr 0.6fr"
                    templateAreas={`
"content1 content2 content3 content4 content5 "
`}
                    p={3}
                  >
                    <GridItem area="content1">
                      <Box>
                        <Text
                          fontSize="md"
                          fontWeight="semibold"
                          color="orange.400"
                          ml="2px"
                        >
                          Qty.
                        </Text>
                      </Box>
                    </GridItem>
                    <GridItem area="content2">
                      <Text
                        fontSize="md"
                        fontWeight="semibold"
                        ml="10px"
                        color="orange.400"
                      >
                        Price
                      </Text>
                    </GridItem>
                    <GridItem area="content3">
                      {product.inventoryModels[0].colors ? (
                        <Text
                          fontSize="md"
                          fontWeight="semibold"
                          color="orange.400"
                          ml="12px"
                        >
                          Variants
                        </Text>
                      ) : (
                        ""
                      )}
                    </GridItem>
                    <GridItem area="content4">
                      {product.inventoryModels[0].sizes ? (
                        <Text
                          fontSize="md"
                          fontWeight="semibold"
                          color="orange.400"
                          ml="4px"
                        >
                          Size
                        </Text>
                      ) : (
                        ""
                      )}
                    </GridItem>
                    <GridItem area="content5" ml="55px">
                      <Text
                        fontSize="md"
                        fontWeight="semibold"
                        color="orange.400"
                      >
                        Action
                      </Text>
                    </GridItem>
                  </Grid>
                </Box>
                {product.inventoryModels.map((inv) => (
                  <Box alignItems="center" key={inv.inventoryId}>
                    <InventoryList
                      inventory={inv}
                      refetchProducts={refetchProducts}
                    />
                    <Divider />
                  </Box>
                ))}
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                _hover={{ color: "orange.400" }}
                mr={3}
                onClick={updateOnClose}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Box>
        <AlertDialog
          isOpen={deleteIsOpen}
          leastDestructiveRef={cancelRef}
          onClose={deleteOnClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                <Text color="orange.400" fontSize="large">
                  Do you want to remove this item?
                </Text>
              </AlertDialogHeader>

              <AlertDialogBody>
                <Text textTransform="capitalize">{product.productName}</Text>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={deleteOnClose}>
                  Cancel
                </Button>
                <Button
                  bg="red.500"
                  _hover={{ bg: "red.600" }}
                  onClick={handleDeleteProductClick}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
      <Box>
        <Modal
          isOpen={isProductInfoOpen}
          onClose={onProductInfoClose}
          size="xl"
          isCentered
        >
          <ModalOverlay />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(handleProductInfoSubmit)(event);
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
                    Product Information
                  </Text>
                  <FormLabel color="gray.400">Product Name</FormLabel>
                  <Input
                    {...register("productName", { required: true })}
                    type="text"
                    placeholder="Product Name"
                    mb="10px"
                  />
                  <FormLabel color="gray.400">Product Description</FormLabel>
                  <Textarea
                    {...register("productDescription", { required: true })}
                    placeholder="Product Description"
                  />
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button _hover={{ color: "orange.400" }} mr="5px" type="submit">
                  Update
                </Button>
                <Button
                  _hover={{ color: "orange.400" }}
                  onClick={onProductInfoClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </Box>
    </Card>
  );
};

export default ProductsList;
