import {
  Box,
  Divider,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import ProductCard from "../components/Product/ProductCard";
import ProductCardContainer from "../components/Product/ProductCardContainer";
import AllProductModels from "../entities/AllProductResponse";
import useGetAllFavorites from "../hooks/useGetAllFavorites";

const FavoritePage = () => {
  const { data: favorites, error } = useGetAllFavorites();
  const isTruncated = useBreakpointValue({ base: true });

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
          <Text fontSize="md" isTruncated={isTruncated} whiteSpace="nowrap">
            Keep track of the products you love and revisit them anytime, making
            your shopping experience more personalized and efficient.
          </Text>
          <Divider pt="15px" />
        </Box>
      </GridItem>
      <GridItem area="content1">
        <SimpleGrid columns={{ sm: 1, md: 3, lg: 3, xl: 4 }} spacing={2}>
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
