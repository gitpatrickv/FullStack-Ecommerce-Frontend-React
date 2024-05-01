import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Product from "../entities/Product";
import { useState } from "react";
import ProductImage from "../entities/ProductImage";

interface Props {
  product: Product;
}

const ProductDetail = ({ product }: Props) => {
  const [count, setCount] = useState(1);

  const handleClickPlus = () => {
    setCount(count + 1);
  };
  const handleClickMinus = () => {
    setCount(count - 1);
  };

  return (
    <Card maxWidth="700px">
      <HStack>
        <Box p="5" maxW="400px">
          {product.productImage &&
            product.productImage.map((image, index) => (
              <Image key={index} src={image} />
            ))}
        </Box>

        <VStack>
          <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
            {product.shopName}
          </Text>
          <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
            {product.productName}
          </Text>

          <Text mt={2}>₱{product.price}</Text>

          <HStack mt="4" pl="10">
            <Text>Quantity</Text>
            <Button onClick={handleClickMinus}>-</Button>
            <Text>{count}</Text>
            <Button onClick={handleClickPlus}>+</Button>
          </HStack>
          <Box mt="4">
            <Button>Add to Cart</Button>
          </Box>
        </VStack>
      </HStack>
    </Card>
  );
};

export default ProductDetail;
