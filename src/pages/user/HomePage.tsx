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
import Category from "../../components/Category/Category";
import ProductCard from "../../components/Product/ProductCard";
import ProductCardContainer from "../../components/Product/ProductCardContainer";
import ProductCardSkeleton from "../../components/Product/ProductCardSkeleton";
import useProducts from "../../hooks/user/useProducts";

const HomePage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const { data, isLoading } = useProducts({ pageNo: page, pageSize });
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

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
        lg: "0.2fr 1fr 0.2fr",
      }}
    >
      <Show above="lg">
        <GridItem area="asideLeft" paddingX={5}>
          <Category />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Image
          src="https://miro.medium.com/v2/resize:fit:1024/0*el52j7p-1MrKjgrN.png"
          w={{ base: "100%", md: "100%", lg: "100%", xl: "100%" }}
          h={{ base: "1%", md: "4%", lg: "4%", xl: "11%" }}
        />
        <Card mt="20px" mb="20px">
          <CardBody>
            <Text textAlign="center" fontSize="larger" color="orange.400">
              DAILY DISCOVER
            </Text>
          </CardBody>
        </Card>
        <SimpleGrid
          columns={{ sm: 1, md: 3, lg: 3, xl: 5 }}
          spacing={2}
          padding="10px"
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <ProductCardContainer key={skeleton}>
                <ProductCardSkeleton />
              </ProductCardContainer>
            ))}
          {data?.data.allProductModels.map((prod) => (
            <ProductCardContainer key={prod.productId}>
              <ProductCard product={prod} />
            </ProductCardContainer>
          ))}
        </SimpleGrid>
        <Box display="flex" justifyContent="center" pt="20px">
          <Button onClick={onClickNavigate} _hover={{ color: "orange.400" }}>
            See More
          </Button>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
