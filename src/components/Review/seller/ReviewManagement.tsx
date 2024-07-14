import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { IoIosStar } from "react-icons/io";
import { ManageRatingAndReviews } from "../../../entities/ManageReview";
import useReplyToReviews from "../../../hooks/seller/useReplyToReviews";

interface Props {
  ratingAndReviews: ManageRatingAndReviews;
  onRefetchReviews: () => void;
}

const ReviewManagement = ({ ratingAndReviews, onRefetchReviews }: Props) => {
  const ratings = [1, 2, 3, 4, 5];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, onSubmit } = useReplyToReviews(
    ratingAndReviews.reviewId,
    ratingAndReviews.storeId
  );

  const handleReplySubmit = async (data: { sellersReply: string }) => {
    try {
      await onSubmit(data);
      onRefetchReviews();
      onClose();
    } catch (error) {
      console.error("Failed to reply to the product review", error);
    }
  };

  return (
    <Card mt="5px">
      <Grid
        templateColumns="0.2fr 1fr 0.2fr"
        templateRows="0.2fr 0.8fr"
        templateAreas={`
    "header header header"
    "asideLeft content1 asideRight"
  `}
      >
        <GridItem
          area="header"
          height="45px"
          border="1px solid"
          borderColor="gray.500"
        >
          <Box display="flex" ml="20px" mt="10px">
            <Avatar
              src={
                ratingAndReviews.photoUrl ||
                "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
              }
              size="xs"
            />
            <Text ml="5px">{ratingAndReviews.name}</Text>
          </Box>
        </GridItem>
        <GridItem area="asideLeft" border="1px solid" borderColor="gray.500">
          <Box display="flex" ml="20px" mt="15px" mb="15px" width="250px">
            <Image
              src={ratingAndReviews.productPhotoUrl}
              w={{ base: "40px", md: "80px", lg: "100px" }}
              h={{ base: "40px", md: "60px", lg: "80px" }}
              border="1px solid"
            />
            <Text ml="5px" whiteSpace="normal">
              {ratingAndReviews.productName}
            </Text>
          </Box>
        </GridItem>

        <GridItem
          area="content1"
          borderRight="1px solid"
          border="1px solid"
          borderColor="gray.500"
        >
          <Box minWidth="600px">
            <Box display="flex" ml="10px" mt="15px">
              {ratings.map((rate) => (
                <Box
                  as={IoIosStar}
                  color={
                    rate <= ratingAndReviews.rating ? "orange.400" : "gray.600"
                  }
                  key={rate}
                />
              ))}
            </Box>
            <Text ml="10px" mt="5px">
              {ratingAndReviews.review}
            </Text>

            <Text ml="10px" mb="15px">
              {ratingAndReviews.createdDate}
            </Text>
          </Box>
          {ratingAndReviews.sellersReply !== null && (
            <Box
              padding={2}
              mt="10px"
              border="1px solid gray"
              ml="10px"
              mr="10px"
              mb="10px"
              maxWidth="100%"
            >
              <Text fontWeight="semibold">Seller's Response:</Text>
              <Text mt="10px">{ratingAndReviews.sellersReply}</Text>
            </Box>
          )}
        </GridItem>
        <GridItem area="asideRight" border="1px solid" borderColor="gray.500">
          {ratingAndReviews.replied === false ? (
            <Box display="flex" justifyContent="center" mt="35px" width="250px">
              <Button
                width="100px"
                onClick={onOpen}
                bg="orange.500"
                _hover={{ bg: "orange.600" }}
              >
                Reply
              </Button>
            </Box>
          ) : (
            <Box display="flex" justifyContent="center" mt="35px" width="250px">
              <Button
                width="100px"
                isDisabled={true}
                bg="orange.500"
                _hover={{ bg: "orange.600" }}
              >
                Reply
              </Button>
            </Box>
          )}
          <Box>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
              <ModalOverlay />
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit(handleReplySubmit)(event);
                }}
              >
                <ModalContent>
                  <ModalHeader>Reply</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Textarea
                      {...register("sellersReply", { required: true })}
                      placeholder="Enter your response."
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      onClick={onClose}
                      mr="5px"
                      width="100px"
                      _hover={{ color: "orange.400" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      bg="orange.500"
                      _hover={{ bg: "orange.600" }}
                      width="100px"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </form>
            </Modal>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ReviewManagement;
