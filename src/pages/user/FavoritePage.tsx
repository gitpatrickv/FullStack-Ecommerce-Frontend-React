import {
  Box,
  Divider,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
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
    <Grid
      templateRows="0.3fr 1fr"
      templateColumns="1fr  "
      templateAreas={`
   "header"
  "content1"
`}
      gap={5}
      p={5}
    >
      <GridItem area="header">
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Text fontSize="xl" fontWeight="semibold">
            My Favorites
          </Text>
          <Text fontSize="md" whiteSpace="nowrap">
            Keep track of the products you love and revisit them anytime, making
            your shopping experience more personalized and efficient.
          </Text>
          <Divider pt="15px" />
        </Box>
      </GridItem>
      <GridItem area="content1">
        <SimpleGrid columns={{ base: 4 }} spacing={2} minW="700px">
          {favorites?.map((product: AllProductModels) => (
            <ProductCardContainer key={product.productId}>
              <ProductCard product={product} />
            </ProductCardContainer>
          ))}
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export default FavoritePage;
