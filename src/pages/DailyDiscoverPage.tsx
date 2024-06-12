import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/Product/ProductCard.tsx";
import ProductCardContainer from "../components/Product/ProductCardContainer.tsx";
import ProductCardSkeleton from "../components/Product/ProductCardSkeleton.tsx";
import useProducts from "../hooks/useProducts.ts";
import { paginationRange } from "../utilities/pagination.ts";

const DailyDiscoverPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = params.get("pageNo");
    return pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
  };

  const [page, setPage] = useState(getPageFromUrl);
  const pageSize = 30;

  const { data, isLoading } = useProducts({ pageNo: page, pageSize });
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const isLastPage = data?.data.pageResponse.last ?? false;
  const totalElements = data?.data.pageResponse.totalElements ?? 0;
  const pages = Math.ceil(totalElements / pageSize);

  const paginationRangeArray = paginationRange({
    totalPage: pages,
    page: page,
    limit: pageSize,
    siblings: 1,
  });

  useEffect(() => {
    const pageFromUrl = getPageFromUrl();
    if (pageFromUrl !== page) {
      setPage(pageFromUrl);
    }
  }, [location.search]);

  const updatePage = (newPage: number) => {
    setPage(newPage);
    navigate(`/daily_discover?pageNo=${newPage}&pageSize=${pageSize}`);
  };

  function handlePageChange(value: any) {
    if (value === "&laquo;" || value === "... ") {
      updatePage(1);
    } else if (value === "&lsaquo;") {
      if (page > 1) {
        updatePage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (!isLastPage) {
        updatePage(page + 1);
      }
    } else if (value === "&raquo;" || value === " ...") {
      updatePage(pages);
    } else {
      updatePage(value);
    }
  }
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
        <>
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            pt="20px"
          >
            <HStack justifyContent="center">
              <Button onClick={() => handlePageChange("&laquo;")}>
                &laquo;
              </Button>
              <Button onClick={() => handlePageChange("&lsaquo;")}>
                &lsaquo;
              </Button>
              {paginationRangeArray.map((number, index) => {
                if (number === number) {
                  return (
                    <Button
                      key={index}
                      onClick={() => handlePageChange(number)}
                      color={page === number ? "orange" : "gray.500"}
                    >
                      {number}
                    </Button>
                  );
                }
              })}
              <Button onClick={() => handlePageChange("&rsaquo;")}>
                &rsaquo;
              </Button>
              <Button onClick={() => handlePageChange("&raquo;")}>
                &raquo;
              </Button>
            </HStack>
          </Box>
        </>
      </GridItem>
    </Grid>
  );
};

export default DailyDiscoverPage;
