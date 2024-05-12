import { Box, Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Product from "../entities/Product";
import { MdStar } from "react-icons/md";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link to={`api/product/` + product.productId}>
      <Card>
        <Image src={product.photoUrl} h={[200, 250]} />
        <CardBody>
          <Text fontSize="xl" fontWeight="semibold" textTransform="uppercase">
            {product?.productName}
          </Text>
          <Text>₱{product?.price}</Text>
          <Flex mt={2} align="center">
            <Box as={MdStar} color="orange.400" />
            <Text ml={1} fontSize="sm">
              <b>4.84</b> (190)
            </Text>
          </Flex>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ProductCard;
