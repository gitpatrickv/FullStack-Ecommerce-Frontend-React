import { Grid, GridItem, Show, Text } from "@chakra-ui/react";
import ProductGrid from "../components/ProductGrid";
import Category from "../components/Category";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: ` " aside main" `,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <Category />
          <Text>CATEGORY</Text>
          <Text>CATEGORY</Text>
          <Text>CATEGORY</Text>
          <Text>CATEGORY</Text>
          <Text>CATEGORY</Text>
          <Text>CATEGORY</Text>
        </GridItem>
      </Show>
      <GridItem area="main">
        <ProductGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
