import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Home/Carousel";
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
      templateColumns="0.2fr 1fr 0.2fr"
      templateAreas={`
      " asideLeft main asideRight"
    `}
    >
      <GridItem area="main">
        <Image
          src="https://miro.medium.com/v2/resize:fit:1024/0*el52j7p-1MrKjgrN.png"
          w={{ base: "100%", md: "100%", lg: "100%", xl: "100%" }}
          h={{ base: "1%", md: "4%", lg: "4%", xl: "11%" }}
        />

        <Card mt="20px" mb="10px" borderRadius="none">
          <CardBody>
            <Text textAlign="center" fontSize="larger" color="orange.400">
              Categories
            </Text>
          </CardBody>
        </Card>
        <Carousel />

        <Card mt="10px" mb="10px" borderRadius="none">
          <CardBody>
            <Text textAlign="center" fontSize="larger" color="orange.400">
              DAILY DISCOVER
            </Text>
          </CardBody>
        </Card>
        <SimpleGrid
          columns={{ base: 5 }}
          spacing={2}
          padding="10px"
          minW="1000px"
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

      <GridItem area="asideLeft">
        <Box minWidth="200px" maxWidth="250px"></Box>
      </GridItem>
      <GridItem area="asideRight">
        <Box minWidth="200px" maxWidth="250px"></Box>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
