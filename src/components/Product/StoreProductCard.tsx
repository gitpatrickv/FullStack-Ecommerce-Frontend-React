import {
  Box,
  Card,
  CardBody,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AllProductModels from "../../entities/AllProductResponse";
import useProductDetail from "../../hooks/user/useProductDetail";
import useProductQueryStore from "../../store/product-store";
import { formatCurrency } from "../../utilities/formatCurrency";
import useGetTotalUserRating from "../../hooks/user/useGetTotalUserRating";
import { useAuthQueryStore } from "../../store/auth-store";

interface Props {
  product: AllProductModels;
}

const StoreProductCard = ({ product }: Props) => {
  const { authStore } = useAuthQueryStore();
  const role = authStore.role;
  const ratings = [1, 2, 3, 4, 5];
  const reset = useProductQueryStore((state) => state.reset);
  const { refetch: refetchProducts } = useProductDetail(product.productId);
  const { data: rating } = useGetTotalUserRating(product.productId);
  const ratingAvg = rating?.ratingAverage ?? 0;
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(`/api/product/` + product?.productId);
    refetchProducts();
    reset();
  };
  const isTruncated = useBreakpointValue({ base: true });

  if (role !== "ADMIN" && product.suspended) {
    return null;
  }

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
          color={product.suspended ? "red" : "white.500"}
        >
          {product?.productName}
        </Text>
        <Text fontSize="md">{formatCurrency(product.price)}</Text>
        <Box display="flex" justifyContent="space-between">
          {rating?.ratingAverage === 0 ||
          rating?.overallTotalUserRating === 0 ? (
            <Box></Box>
          ) : (
            <Box display="flex" alignItems="center" whiteSpace="nowrap">
              {ratings.map((rate) => (
                <Box
                  as={IoIosStar}
                  color={rate <= ratingAvg ? "orange.400" : "gray.600"}
                  key={rate}
                />
              ))}

              <Text ml={1} fontSize="sm">
                {rating?.ratingAverage || 0} ({rating?.overallTotalUserRating})
              </Text>
            </Box>
          )}

          <Text ml="5px" whiteSpace="nowrap">
            {product.productSold} sold
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default StoreProductCard;
