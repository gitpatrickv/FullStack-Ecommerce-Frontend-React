import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  FormLabel,
  Image,
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import Category from "../../entities/Category";
import useEditCategoryName from "../../hooks/admin/useEditCategoryName";
import useUpdateCategoryPhoto from "../../hooks/admin/useUpdateCategoryPhoto";

interface Props {
  category: Category;
  onRefetchCategory: () => void;
}

const CategoryList = ({ category, onRefetchCategory }: Props) => {
  const isTruncated = useBreakpointValue({ base: true });
  const fontSize = useBreakpointValue({ base: "sm", xl: "xl" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSubmit } = useEditCategoryName(category.categoryId);
  const { mutate: uploadPhoto } = useUpdateCategoryPhoto(category.categoryId);
  const { register, handleSubmit, setValue } = useForm<Category>({
    defaultValues: {
      categoryName: category.categoryName,
    },
  });

  useEffect(() => {
    if (category) {
      setValue("categoryName", category.categoryName);
    }
  }, [category, setValue]);

  const handleEditCategoryNameClick = async (data: {
    categoryName: string;
  }) => {
    try {
      await onSubmit(data);
      onRefetchCategory();
      onClose();
    } catch (error) {
      console.error("Error editing category name ", error);
    }
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadPhoto({ file: file });
    }
  };

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
              fontSize="lg"
              fontWeight="semibold"
              textTransform="capitalize"
              whiteSpace="nowrap"
              isTruncated={isTruncated}
            >
              {category.categoryName}
            </Text>

            <Box cursor="pointer" onClick={onOpen}>
              <FaRegEdit size="22px" />
            </Box>
          </Box>
        </CardBody>
        <Box>
          <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay />
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(handleEditCategoryNameClick)(event);
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
                    >
                      Edit Category
                    </Text>
                    <Box
                      display="flex"
                      mt="10px"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Avatar
                        src={
                          category.categoryPhotoUrl ||
                          "https://st4.depositphotos.com/38069286/41918/v/450/depositphotos_419187960-stock-illustration-shopping-bag-icon-purchase-symbol.jpg"
                        }
                        size="xl"
                      />
                      <input
                        type="file"
                        accept=".jpeg, .png"
                        onChange={handleUploadImage}
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
                    <FormLabel color="white.500" mt="10px">
                      Category Name
                    </FormLabel>
                    <Input
                      {...register("categoryName", { required: true })}
                      type="text"
                      mb="10px"
                      maxWidth="70%"
                    />
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
    </>
  );
};

export default CategoryList;
