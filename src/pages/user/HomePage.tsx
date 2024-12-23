import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCarousel from "../../components/Home/CategoryCarousel";
import ImageCarousel from "../../components/Home/ImageCarousel";
import ProductCard from "../../components/Product/ProductCard";
import ProductCardContainer from "../../components/Product/ProductCardContainer";
import ProductCardSkeleton from "../../components/Product/ProductCardSkeleton";
import useProducts from "../../hooks/user/useProducts";

const HomePage = () => {
  const navigate = useNavigate();
  const [page, _setPage] = useState(1);
  const pageSize = 30;
  const { data, isLoading } = useProducts({ pageNo: page, pageSize });

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const totalElements = data?.data.pageResponse.totalElements ?? 0;
  const onClickNavigate = () => {
    if (totalElements > pageSize) {
      navigate(`/daily_discover?pageNo=${page + 1}&pageSize=${pageSize}`);
    } else {
      navigate(`/daily_discover?pageNo=${page}&pageSize=${pageSize}`);
    }
  };

  return (
    <Grid templateColumns="1fr" templateAreas={`"main"`}>
      <GridItem area="main">
        <ImageCarousel />
        <Card mt="20px" mb="10px" borderRadius="none">
          <CardBody>
            <Text textAlign="center" fontSize="larger" color="orange.400">
              Categories
            </Text>
          </CardBody>
        </Card>
        <CategoryCarousel />
        <Card mt="20px" mb="10px" borderRadius="none">
          <CardBody>
            <Text textAlign="center" fontSize="larger" color="orange.400">
              DAILY DISCOVER
            </Text>
          </CardBody>
        </Card>
        <SimpleGrid columns={{ base: 6 }} spacing={2} padding="10px">
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
        <Box display="flex" justifyContent="center">
          <Box
            mt="20px"
            height="50px"
            width="300px"
            border="1px solid"
            borderColor="gray.600"
            textAlign="center"
            cursor="pointer"
            userSelect="none"
            _hover={{
              color: "orange.500",
              borderColor: "orange.500",
              transform: "scale(1.03)",
              transition: "transform .15s ease-in",
            }}
            onClick={onClickNavigate}
          >
            <Text fontSize="xl" position="relative" top="8px">
              See More
            </Text>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
