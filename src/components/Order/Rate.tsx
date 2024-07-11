import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosStar } from "react-icons/io";
import OrderItem from "../../entities/Order";
import useRateProducts from "../../hooks/user/useRateProducts";
interface Props {
  order: OrderItem;
  onRefetch: () => void;
}

const Rate = ({ order, onRefetch }: Props) => {
  const ratings = [1, 2, 3, 4, 5];

  const {
    register,
    handleSubmit,
    onSubmit: onRatingSubmit,
  } = useRateProducts(order.productId, order.id);

  const [rating, setRating] = useState<number>(0);

  const handleRatingClick = (rate: number) => {
    setRating(rate);
  };

  const handleRatingSubmit = async (data: {
    rating: number;
    review: string;
  }) => {
    const formData = { ...data, rating };
    try {
      await onRatingSubmit(formData);
      onRefetch();
    } catch (error) {
      console.error("Error Rating Product: ", error);
    }
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(handleRatingSubmit)(event);
      }}
    >
      <FormControl>
        <Box display="flex" mb="20px">
          <Image
            src={order.photoUrl}
            w={{ base: "40px", md: "80px", lg: "100px" }}
            h={{ base: "40px", md: "60px", lg: "80px" }}
          />
          <Text fontWeight="semibold" textTransform="capitalize" pl="20px">
            {order.productName}
          </Text>
        </Box>

        <FormLabel>Product Quality</FormLabel>
        <Box display="flex">
          {ratings.map((rate) => (
            <IoIosStar
              key={rate}
              size="30px"
              color={rate <= rating ? "orange" : "gray"}
              cursor="pointer"
              onClick={() => handleRatingClick(rate)}
            />
          ))}
          <Input
            type="hidden"
            value={rating}
            {...register("rating", {
              required: true,
            })}
          />
          {rating > 0 && (
            <Text color="orange" fontSize="larger" ml="10px">
              {rating === 5
                ? "Amazing"
                : rating === 4
                ? "Good"
                : rating === 3
                ? "Fair"
                : rating === 2
                ? "Poor"
                : "Terrible"}
            </Text>
          )}
        </Box>
      </FormControl>

      <FormControl mt="10px">
        <FormLabel>Review</FormLabel>
        <Textarea
          {...register("review", { required: true })}
          placeholder="Share more thoughts on the product to help other buyers."
        />
      </FormControl>
      <Box display="flex" justifyContent="flex-end" mt="15px" mb="20px">
        <Button
          bg="orange.500"
          _hover={{ bg: "orange.600" }}
          width="100px"
          type="submit"
        >
          Rate
        </Button>
      </Box>
    </form>
  );
};

export default Rate;
