import { Grid, GridItem, Show, Text } from "@chakra-ui/react";
import Category from "../components/Category/Category";
import ProductGrid from "../components/Product/ProductGrid";

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
        {/* <Image
          src="https://down-ph.img.susercontent.com/file/ph-50009109-7b9fae9a063f50ac17699b7ea90d0dd4"
          w="full"
          height="25vh"
        /> */}
        <ProductGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
