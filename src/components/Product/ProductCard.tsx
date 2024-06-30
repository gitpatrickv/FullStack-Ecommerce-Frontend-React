import {
  Box,
  Card,
  CardBody,
  Flex,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AllProductModels from "../../entities/AllProductResponse";
import useProductQueryStore from "../../store/product-store";
import { formatCurrency } from "../../utilities/formatCurrency";
import useProductDetail from "../../hooks/user/useProductDetail";

interface Props {
  product: AllProductModels;
}

const ProductCard = ({ product }: Props) => {
  const reset = useProductQueryStore((state) => state.reset);
  const { refetch: refetchProducts } = useProductDetail(product.productId);
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(`/api/product/` + product?.productId);
    refetchProducts();
    reset();
  };
  const isTruncated = useBreakpointValue({ base: true });
  return (
    <Card onClick={handleNavigateClick} cursor="pointer">
      <Image src={product.photoUrl} h={[150, 200]} />
      <CardBody>
        <Text
          fontSize="large"
          fontWeight="semibold"
          textTransform="capitalize"
          isTruncated={isTruncated}
          whiteSpace="nowrap"
        >
          {product?.productName}
        </Text>
        <Text fontSize="md">{formatCurrency(product.price)}</Text>
        <Flex mt={2} align="center">
          <Box as={MdStar} color="orange.400" />
          <Text ml={1} fontSize="sm">
            <b>4.84</b> ({product.productSold})
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
