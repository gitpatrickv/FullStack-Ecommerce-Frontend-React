import { Box, Divider, SimpleGrid, Text } from "@chakra-ui/react";
import ProductCard from "../../components/Product/ProductCard";
import ProductCardContainer from "../../components/Product/ProductCardContainer";
import AllProductModels from "../../entities/AllProductResponse";
import useGetAllFavorites from "../../hooks/user/useGetAllFavorites";

const FavoritePage = () => {
  const { data: favorites, error } = useGetAllFavorites();

  if (error) {
    console.log(error);
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        mt="15px"
      >
        <Text fontSize="xl" fontWeight="semibold">
          My Favorites
        </Text>
        <Text fontSize="md" whiteSpace="nowrap">
          Keep track of the products you love and revisit them anytime, making
          your shopping experience more personalized and efficient.
        </Text>
        <Divider mt="20px" mb="25px" />
      </Box>

      <SimpleGrid columns={{ base: 5 }} spacing={2} minW="700px">
        {favorites?.map((product: AllProductModels) => (
          <ProductCardContainer key={product.productId}>
            <ProductCard product={product} />
          </ProductCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default FavoritePage;
