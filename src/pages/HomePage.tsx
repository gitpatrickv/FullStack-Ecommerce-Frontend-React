import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  Image,
  Show,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category/Category";
import ProductCard from "../components/Product/ProductCard";
import ProductCardContainer from "../components/Product/ProductCardContainer";
import useProducts from "../hooks/useProducts";

const HomePage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 25;
  const { data } = useProducts({ pageNo: page, pageSize });

  const onClickNavigate = () => {
    navigate(`/daily_discover?pageNo=${page + 1}&pageSize=${pageSize}`);
  };

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
        <Image
          src="https://miro.medium.com/v2/resize:fit:1024/0*el52j7p-1MrKjgrN.png"
          w="100%"
          h="12%"
        />
        <Card mt="20px" mb="20px">
          <CardBody>
            <Text textAlign="center" fontSize="larger" color="orange">
              DAILY DISCOVER
            </Text>
          </CardBody>
        </Card>
        <SimpleGrid
          columns={{ sm: 1, md: 3, lg: 3, xl: 5 }}
          spacing={2}
          padding="10px"
        >
          {data?.data.allProductModels.map((prod) => (
            <ProductCardContainer key={prod.productId}>
              <ProductCard product={prod} />
            </ProductCardContainer>
          ))}
        </SimpleGrid>
        <Box display="flex" justifyContent="center" pt="20px">
          <Button onClick={onClickNavigate}>See More</Button>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
