import {
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";
import ProductCardContainer from "../../components/Product/ProductCardContainer";
import AllProductModels from "../../entities/AllProductResponse";
import useSearchProducts from "../../hooks/user/useSearchProducts";
import { paginationRange } from "../../utilities/pagination";

export const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = params.get("pageNo");
    return pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
  };

  const [page, setPage] = useState(getPageFromUrl);
  const pageSize = 25;
  const [searchParams] = useSearchParams();
  const query = searchParams.get("keyword") || "";
  const [sortBy, setSortBy] = useState("");

  const { data: results } = useSearchProducts({
    keyword: query,
    pageNo: page,
    pageSize: pageSize,
    sortBy: sortBy,
  });
  const cPage = results?.pageResponse.pageNo ?? 0;
  const currentPage = cPage + 1;
  const totalPages = results?.pageResponse.totalPages ?? 0;
  const isLastPage = results?.pageResponse.last ?? false;
  const totalElements = results?.pageResponse.totalElements ?? 0;
  const pages = Math.ceil(totalElements / pageSize);

  const [searchResults, setSearchResults] = useState<AllProductModels[]>([]);

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

    if (results) {
      setSearchResults(results.allProductModels);
    }
  }, [location.search, results]);

  const updatePage = (newPage: number) => {
    setPage(newPage);
    navigate(
      `/search?keyword=${query}&pageNo=${newPage}&pageSize=${pageSize}&sortBy=${sortBy}`
    );
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

  const handleSortClick = (event: any) => {
    setSortBy(event.target.value);
    setPage(1);
    navigate(
      `/search?keyword=${query}&pageNo=1&pageSize=${pageSize}&sortBy=${event.target.value}`
    );
  };

  return (
    <Grid
      templateColumns="250px 1fr 250px"
      templateAreas={`
      " asideLeft main asideRight"
    `}
    >
      <GridItem area="main">
        <>
          <Text mb="5px">
            Search Results for "
            <Text as="span" color="orange">
              {query}
            </Text>
            "
          </Text>
          <Card p="13px" mb="10px" borderRadius="none">
            <Box display="flex" alignItems="center">
              <Text fontSize="medium" pr="10px">
                Sort By
              </Text>
              <Button
                value="productName"
                onClick={handleSortClick}
                mr="5px"
                width="120px"
                _hover={{ color: "orange.400" }}
              >
                Relevance
              </Button>
              <Button
                value="createdDate"
                onClick={handleSortClick}
                mr="5px"
                width="120px"
                _hover={{ color: "orange.400" }}
              >
                Latest
              </Button>
              <Button
                value="productSold"
                onClick={handleSortClick}
                width="120px"
                _hover={{ color: "orange.400" }}
              >
                Top Sales
              </Button>
              <Spacer />
              <Text pr="15px" fontSize="medium">
                <Text as="span" color="orange">
                  {currentPage}
                </Text>
                /{totalPages}
              </Text>
              <Button mr="2px" onClick={() => handlePageChange("&lsaquo;")}>
                &lsaquo;
              </Button>
              <Button onClick={() => handlePageChange("&rsaquo;")}>
                &rsaquo;
              </Button>
            </Box>
          </Card>
          {searchResults?.length === 0 ? (
            <Box display="flex" justifyContent="center">
              <Text fontSize="50px" fontWeight="semibold">
                No results found.
              </Text>
            </Box>
          ) : (
            <SimpleGrid
              columns={{ base: 5 }}
              spacing={2}
              padding="10px"
              minW="1000px"
            >
              {searchResults?.map((product: AllProductModels) => (
                <ProductCardContainer key={product.productId}>
                  <ProductCard product={product} />
                </ProductCardContainer>
              ))}
            </SimpleGrid>
          )}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            pt="20px"
          >
            {searchResults?.length === 0 ? (
              ""
            ) : (
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
            )}
          </Box>
        </>
      </GridItem>
    </Grid>
  );
};
