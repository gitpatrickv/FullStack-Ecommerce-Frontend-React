import { Avatar, Box, Text } from "@chakra-ui/react";
import { IoIosStar } from "react-icons/io";
import RatingAndReview from "../../entities/RatingAndReview";

interface Props {
  review: RatingAndReview;
}
const Review = ({ review }: Props) => {
  const ratings = [1, 2, 3, 4, 5];
  return (
    <Box padding={3}>
      <Box display="flex" mb="5px">
        <Avatar
          src={
            review.photoUrl ||
            "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
          }
          size="sm"
        />
        <Box
          display="flex"
          flexDirection="column"
          ml="10px"
          position="relative"
          top="-5px"
        >
          <Text>{review.name}</Text>
          <Box display="flex" flexDirection="row">
            {ratings.map((rate) => (
              <Box
                as={IoIosStar}
                color={rate <= review.rating ? "orange.400" : "gray.600"}
                key={rate}
              />
            ))}
          </Box>
          <Text>{review.createdDate}</Text>
        </Box>
      </Box>

      <Text ml="42px">{review.review}</Text>
    </Box>
  );
};

export default Review;
