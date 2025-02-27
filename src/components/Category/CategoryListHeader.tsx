import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import useCreateCategory from "../../hooks/admin/useCreateCategory";

const CategoryListHeader = () => {
  const { onSubmit, register, handleSubmit, errors, isOpen, onOpen, onClose } =
    useCreateCategory();
  const fontSize = useBreakpointValue({ base: "sm", xl: "xl" });

  return (
    <Card mb="10px" borderRadius="none">
      <CardBody>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="semibold">
            Category List
          </Text>
          <Box display="flex" alignItems="center">
            <Text fontSize="xl" fontWeight="semibold" mr="10px">
              New Category
            </Text>
            <IconButton
              icon={<FaPlus />}
              aria-label="Add"
              colorScheme="orange"
              onClick={onOpen}
            />
          </Box>
        </Box>
      </CardBody>
      <Box>
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
          <ModalOverlay />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(onSubmit)(event);
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
                    mb="20px"
                  >
                    Create a New Category
                  </Text>
                  <FormLabel color="white.500" mt="10px">
                    Category Name
                  </FormLabel>
                  <FormControl mb="10px">
                    <Input
                      {...register("categoryName", {
                        required: "Category name is required",
                      })}
                      type="text"
                      maxWidth="70%"
                    />
                    {errors.categoryName && (
                      <Text color="red"> {errors.categoryName.message} </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <input
                      type="file"
                      accept=".jpeg, .png"
                      {...register("file", {
                        required: "Photo is required",
                      })}
                    />
                    {errors.file && (
                      <Text color="red"> {errors.file.message} </Text>
                    )}
                  </FormControl>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button
                  _hover={{ color: "orange.400" }}
                  onClick={onClose}
                  width="100px"
                >
                  Close
                </Button>
                <Button
                  ml="5px"
                  type="submit"
                  bg="orange.500"
                  _hover={{ bg: "orange.600" }}
                  width="100px"
                >
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </Box>
    </Card>
  );
};

export default CategoryListHeader;
