import { Grid, GridItem, Show, Text } from "@chakra-ui/react";
import ProductGrid from "../components/Product/ProductGrid";
import Category from "../components/Category/Category";

const HomePage = () => {
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
      <Show above="lg">
        <GridItem area="asideLeft" paddingX={5}>
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
