import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { IoIosStar } from "react-icons/io";
import { ManageRatingAndReviews } from "../../../entities/ManageReview";

interface Props {
  ratingAndReviews: ManageRatingAndReviews;
}

const ReviewManagement = ({ ratingAndReviews }: Props) => {
  const ratings = [1, 2, 3, 4, 5];

  return (
    <Card mt="5px">
      <Grid
        templateColumns="0.2fr 0.6fr 0.2fr"
        templateRows="0.2fr 0.8fr"
        templateAreas={`
    "header header header"
    "asideLeft content1 asideRight"
  `}
      >
        <GridItem area="header" height="40px">
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
          <Divider mt="8px" />
        </GridItem>
        <GridItem area="asideLeft">
          <Box display="flex" ml="20px" mt="15px" mb="15px">
            <Image
              src={ratingAndReviews.productPhotoUrl}
              w={{ base: "40px", md: "80px", lg: "100px" }}
              h={{ base: "40px", md: "60px", lg: "80px" }}
              border="1px solid"
            />
            <Text ml="5px">{ratingAndReviews.productName}</Text>
          </Box>
        </GridItem>

        <GridItem area="content1">
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
          {ratingAndReviews.sellersReply !== null && (
            <Box
              padding={2}
              mt="10px"
              border="1px solid gray"
              ml="10px"
              mr="10px"
              mb="10px"
            >
              <Text fontWeight="semibold">Seller's Response:</Text>
              <Text mt="10px">{ratingAndReviews.sellersReply}</Text>
            </Box>
          )}
        </GridItem>
        <GridItem area="asideRight">
          <Box display="flex" justifyContent="center" mt="35px">
            <Button width="120px">Reply</Button>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ReviewManagement;
