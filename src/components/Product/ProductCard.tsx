import { Box, Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Product from "../../entities/Product";
import { MdStar } from "react-icons/md";
import useProductQueryStore from "../../store/product-store";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const reset = useProductQueryStore((state) => state.reset);
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(`/api/product/` + product?.productId);
    reset();
  };

  return (
    <Card onClick={handleNavigateClick} cursor="pointer">
      <Image src={product.photoUrl} h={[200, 250]} />
      <CardBody>
        <Text fontSize="xl" fontWeight="semibold" textTransform="capitalize">
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
  );
};

export default ProductCard;
