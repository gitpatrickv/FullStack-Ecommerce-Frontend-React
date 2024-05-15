import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Product from "../../entities/Product";
import useAddToCart from "../../hooks/useAddToCart";
import useProductQueryStore from "../../store/product-store";
import { formatCurrency } from "../../utilities/formatCurrency";

interface Props {
  product: Product;
}

const jwtToken = localStorage.getItem("jwtToken");

const ProductDetail = ({ product }: Props) => {
  const { count, increment, decrement, reset } = useProductQueryStore(
    (state) => ({
      count: state.productQuery.count,
      increment: state.increment,
      decrement: state.decrement,
      reset: state.reset,
    })
  );

  const toast = useToast();

  const { mutate } = useAddToCart();

  const handleAddToCartClick = async () => {
    try {
      await mutate({
        productId: product.productId,
        quantity: count,
        jwtToken: jwtToken || "",
      });
      toast({
        position: "top",
        title: "Item has been added to your cart",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        position: "top",
        title: "Error",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    reset();
  };

  return (
    <Center>
      <Box m="20" p="20">
        <HStack>
          <Box p="5" w={[400, 500, 600]}>
            {product?.productImage.map((image, index) => (
              <Image key={index} src={image} h={[200, 300]} />
            ))}
          </Box>
          <Flex alignSelf="start">
            <VStack alignItems="start" m="4">
              <Text
                fontSize="xl"
                fontWeight="semibold"
                lineHeight="short"
                textTransform="uppercase"
              >
                {product.shopName}
              </Text>
              <Text
                fontSize="xl"
                fontWeight="semibold"
                lineHeight="short"
                textTransform="capitalize"
              >
                {product.productName}
              </Text>
              <Text>{formatCurrency(product.price)}</Text>
              <Box position="relative" bottom="-100px">
                <HStack mt="4">
                  <Text>Quantity</Text>
                  <Button onClick={() => decrement(product.quantity)}>-</Button>
                  <Text>{count}</Text>
                  <Button onClick={() => increment(product.quantity)}>+</Button>
                  <Text color="gray.500">
                    {product.quantity} pieces available
                  </Text>
                </HStack>
                <Button mt="4" onClick={handleAddToCartClick}>
                  Add to Cart
                </Button>
              </Box>
            </VStack>
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
};

export default ProductDetail;
