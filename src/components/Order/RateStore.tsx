import { Box, Button, FormLabel, Input, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosStar } from "react-icons/io";
import useRateStore from "../../hooks/user/useRateStore";

interface Props {
  orderId: string;
}

const RateStore = ({ orderId }: Props) => {
  const storeRatings = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState<number>(0);
  const {
    register: registerRateStore,
    handleSubmit: handleRateStoreSubmit,
    onSubmit: onRateStoreSubmit,
  } = useRateStore(orderId);

  const handleStoreRatingClick = (rate: number) => {
    setRating(rate);
  };

  const handleStoreRatingSubmit = async (data: { rating: number }) => {
    const formData = { ...data, rating };
    try {
      await onRateStoreSubmit(formData);
    } catch (error) {
      console.error("Error Rating Store: ", error);
    }
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleRateStoreSubmit(handleStoreRatingSubmit)(event);
      }}
    >
      <FormLabel>Seller Service</FormLabel>
      <Box display="flex" alignItems="center" mb="10px">
        {storeRatings.map((rate) => (
          <IoIosStar
            key={rate}
            size="30px"
            color={rate <= rating ? "orange" : "gray"}
            cursor="pointer"
            onClick={() => handleStoreRatingClick(rate)}
          />
        ))}
        <Input
          type="hidden"
          value={rating}
          {...registerRateStore("rating", {
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
        <Spacer />
        <Button
          bg="orange.500"
          _hover={{ bg: "orange.600" }}
          width="100px"
          type="submit"
          isDisabled={rating > 0 ? false : true}
        >
          Rate
        </Button>
      </Box>
    </form>
  );
};

export default RateStore;
