import { Box, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Product/ProductCard";
import ProductCardContainer from "../components/Product/ProductCardContainer";
import Product from "../entities/Product";
import useSearchProducts from "../hooks/useSearchProducts";

export const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("keyword") || "";
  const { data: results } = useSearchProducts(query);
  useEffect(() => {
    if (results) {
      setSearchResults(results);
    }
  }, [results]);
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: ` " asideLeft main asideRight" `,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr 200px",
      }}
    >
      <GridItem area="main">
        <>
          <Text>Search Results for "{query}"</Text>
          {searchResults.length === 0 ? (
            <Box display="flex" justifyContent="center">
              <Text fontSize="50px" fontWeight="semibold">
                No results found.
              </Text>
            </Box>
          ) : (
            <SimpleGrid
              columns={{ sm: 1, md: 3, lg: 3, xl: 5 }}
              spacing={2}
              padding="10px"
            >
              {searchResults.map((product: Product) => (
                <ProductCardContainer key={product.productId}>
                  <ProductCard product={product} />
                </ProductCardContainer>
              ))}
            </SimpleGrid>
          )}
        </>
      </GridItem>
    </Grid>
  );
};
