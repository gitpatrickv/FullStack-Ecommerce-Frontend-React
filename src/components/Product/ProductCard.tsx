import {
  Box,
  Card,
  CardBody,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AllProductModels from "../../entities/AllProductResponse";
import useProductDetail from "../../hooks/user/useProductDetail";
import useProductQueryStore from "../../store/product-store";
import { formatCurrency } from "../../utilities/formatCurrency";
import useGetProductRatingAvg from "../../hooks/user/useGetProductRatingAvg";

interface Props {
  product: AllProductModels;
}

const ProductCard = ({ product }: Props) => {
  const reset = useProductQueryStore((state) => state.reset);
  const { refetch: refetchProducts } = useProductDetail(product.productId);
  const { data: rating } = useGetProductRatingAvg(product.productId);
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
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Box as={MdStar} color="orange.400" />
            <Text ml={1} fontSize="sm">
              {rating?.ratingAverage || 0} ({rating?.totalNumberOfUserRating})
            </Text>
          </Box>
          <Text ml="5px">{product.productSold} sold</Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
