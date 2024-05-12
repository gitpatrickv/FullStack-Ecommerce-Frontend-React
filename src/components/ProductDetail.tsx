import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import Product from "../entities/Product";
import useAddToCart from "../hooks/useAddToCart";

interface Props {
  product: Product;
}

const jwtToken = localStorage.getItem("jwtToken");

const ProductDetail = ({ product }: Props) => {
  const [count, setCount] = useState(1);

  const handleClickPlus = () => {
    setCount((prevState) => prevState + 1);
  };
  const handleClickMinus = () => {
    setCount((prevState) => prevState - 1);
  };

  const handleAddToCartClick = () => {
    const productId = product.productId;
    const quantity = count;
    useAddToCart(productId, quantity, jwtToken || "");
  };

  return (
    <Center>
      <Box m="20" p="20">
        <HStack>
          <Box p="5" w={[400, 500, 600]}>
            {product.productImage &&
              product.productImage.map((image, index) => (
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
                textTransform="uppercase"
              >
                {product.productName}
              </Text>
              <Text>₱{product.price}</Text>

              <Box position="relative" bottom="-100px">
                <HStack mt="4">
                  <Text>Quantity</Text>
                  <Button onClick={handleClickMinus}>-</Button>
                  <Text>{count}</Text>
                  <Button onClick={handleClickPlus}>+</Button>
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
