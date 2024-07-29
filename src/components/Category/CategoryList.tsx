import {
  Box,
  Button,
  Card,
  CardBody,
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
import Category from "../../entities/Category";
import { FaRegEdit } from "react-icons/fa";
import { register } from "module";

interface Props {
  category: Category;
}

const CategoryList = ({ category }: Props) => {
  const fontSize = useBreakpointValue({ base: "sm", xl: "xl" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Card borderRadius="none">
        <Image src={category.categoryPhotoUrl} h={[150, 200]} />
        <CardBody>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              fontSize="large"
              fontWeight="semibold"
              textTransform="capitalize"
              whiteSpace="nowrap"
            >
              {category.categoryName}
            </Text>
            <Box cursor="pointer" onClick={onOpen}>
              <FaRegEdit size="20px" />
            </Box>
          </Box>
        </CardBody>
        <Box>
          <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay />
            {/* <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(handleFormSubmit)(event);
              }}
            > */}
            <ModalContent>
              <ModalCloseButton />
              <ModalBody mt="30px">
                <Box>
                  <Text
                    fontSize={fontSize}
                    fontWeight="semibold"
                    textTransform="capitalize"
                    mb="5px"
                  >
                    Edit Category
                  </Text>
                  <FormLabel color="white.500" mt="10px">
                    Category Name
                  </FormLabel>
                  <Input
                    // {...register("productName", { required: true })}
                    type="text"
                    placeholder="Product Name"
                    mb="10px"
                  />
                  {/* <FormLabel color="gray.400">Product Description</FormLabel>
                  <Textarea
                    {...register("productDescription", { required: true })}
                    placeholder="Product Description"
                  /> */}
                  <input
                    type="file"
                    accept=".jpeg, .png"
                    //   onChange={handleUploadImage}
                    style={{ display: "none" }}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button
                      as="span"
                      mt="20px"
                      cursor="pointer"
                      _hover={{ color: "orange.400" }}
                    >
                      Select Image
                    </Button>
                  </label>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button _hover={{ color: "orange.400" }} onClick={onClose}>
                  Close
                </Button>
                <Button
                  ml="5px"
                  type="submit"
                  bg="orange.500"
                  _hover={{ bg: "orange.600" }}
                >
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
            {/* </form> */}
          </Modal>
        </Box>
      </Card>
    </>
  );
};

export default CategoryList;
