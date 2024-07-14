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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";
import ProductCardContainer from "../../components/Product/ProductCardContainer";
import ProductCardSkeleton from "../../components/Product/ProductCardSkeleton";
import useGetAllProductsByCategory from "../../hooks/user/useGetAllProductsByCategory";
import { paginationRange } from "../../utilities/pagination";

const ProductCategoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const getPageFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = params.get("pageNo");
    return pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
  };

  const [page, setPage] = useState(getPageFromUrl);
  const pageSize = 30;

  const { data: getAllProductsByCategory, isLoading } =
    useGetAllProductsByCategory({
      categoryId: categoryId!,
      pageNo: page,
      pageSize,
    });

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const isLastPage = getAllProductsByCategory?.data.pageResponse.last ?? false;
  const totalElements =
    getAllProductsByCategory?.data.pageResponse.totalElements ?? 0;
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
    navigate(`/category/${categoryId}?pageNo=${newPage}&pageSize=${pageSize}`);
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
        <Card mt="20px" mb="5px" borderRadius="none">
          <CardBody>
            <Text textAlign="center" fontSize="larger" color="orange.400">
              {getAllProductsByCategory?.data.allProductModels[0]
                ?.categoryName || "No products found in this category."}
            </Text>
          </CardBody>
        </Card>

        <Box>
          <SimpleGrid
            columns={{ base: 2, sm: 3, md: 3, lg: 3, xl: 5 }}
            spacing={2}
            padding="10px"
          >
            {isLoading &&
              skeletons.map((skeleton) => (
                <ProductCardContainer key={skeleton}>
                  <ProductCardSkeleton />
                </ProductCardContainer>
              ))}
            {getAllProductsByCategory?.data.allProductModels.map((product) => (
              <ProductCardContainer key={product.productId}>
                <ProductCard product={product} />
              </ProductCardContainer>
            ))}
          </SimpleGrid>
          {getAllProductsByCategory?.data.allProductModels.length === 0 ? (
            ""
          ) : (
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
                        color={page === number ? "orange.500" : "white.500"}
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
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ProductCategoryPage;
