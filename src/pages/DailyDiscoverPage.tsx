import { Grid, GridItem } from "@chakra-ui/react";
import ProductGrid from "../components/Product/ProductGrid";

const DailyDiscoverPage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: ` " asideLeft main asideRight" `,
      }}
      templateColumns={{
        base: "1fr",
        lg: "0.2fr 1fr 0.2fr",
      }}
    >
      <GridItem area="main">
        <ProductGrid />
      </GridItem>
    </Grid>
  );
};

export default DailyDiscoverPage;
