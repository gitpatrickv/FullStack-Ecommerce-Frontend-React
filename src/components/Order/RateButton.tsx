import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
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
import { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import useRateProducts from "../../hooks/user/useRateProducts";
import OrderItem from "../../entities/Order";

interface Props {
  order: OrderItem;
  refetchCompletedOrder: () => void;
}

const RateButton = ({ order, refetchCompletedOrder }: Props) => {
  const ratings = [1, 2, 3, 4, 5];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ratingStatus, setRatingStatus] = useState<boolean>(order.rated);

  useEffect(() => {
    setRatingStatus(order.rated);
  }, [order.rated]);

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
      setRatingStatus(true);
      refetchCompletedOrder();
      onClose();
    } catch (error) {
      console.error("Error Rating Product: ", error);
    }
  };

  return (
    <>
      {ratingStatus ? (
        ""
      ) : (
        <Text
          cursor="pointer"
          color="orange.400"
          fontWeight="semibold"
          textDecoration="underline 2px"
          style={{ textUnderlineOffset: "5px" }}
          onClick={onOpen}
        >
          Rate
        </Text>
      )}

      <Box>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
          <ModalOverlay />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(handleRatingSubmit)(event);
            }}
          >
            <ModalContent>
              <ModalHeader>Rate Product</ModalHeader>
              <ModalCloseButton />
              <ModalBody mb="10px">
                <FormControl>
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
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={onClose}
                  width="100px"
                  _hover={{ color: "orange.400" }}
                >
                  Cancel
                </Button>
                <Button
                  bg="orange.500"
                  _hover={{ bg: "orange.600" }}
                  ml="10px"
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
    </>
  );
};

export default RateButton;
