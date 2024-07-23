import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import ProductListHeader from "../../components/Product/seller/ProductListHeader";
import ProductsList from "../../components/Product/seller/ProductsList";
import useGetAllSellersProduct from "../../hooks/seller/useGetAllSellersProduct";
import { useAuthQueryStore } from "../../store/auth-store";
import { paginationRange } from "../../utilities/pagination";

const MyProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  const getPageFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = params.get("pageNo");
    return pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
  };
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(getPageFromUrl);
  const pageSize = 10;

  const { data: getAllStoreProducts, refetch: refetchProducts } =
    useGetAllSellersProduct({
      jwtToken: jwtToken,
      pageNo: page,
      pageSize,
      sortBy: sortBy,
    });
  const cPage = getAllStoreProducts?.data.pageResponse.pageNo ?? 0;
  const currentPage = cPage + 1;
  const totalPages = getAllStoreProducts?.data.pageResponse.totalPages ?? 0;
  const isLastPage = getAllStoreProducts?.data.pageResponse.last ?? false;
  const totalElements =
    getAllStoreProducts?.data.pageResponse.totalElements ?? 0;
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
    navigate(`/seller/product?pageNo=${newPage}&pageSize=${pageSize}`);
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
      `/seller/product?pageNo=1&pageSize=${pageSize}&sortBy=${event.target.value}`
    );
  };

  return (
    <Grid
      templateColumns="1fr"
      templateAreas={`
    "main"
    `}
    >
      <GridItem area="main">
        <Box mt="20px">
          <ProductListHeader />
          <Card mb="5px" borderRadius="none">
            <Box padding={5}>
              <Box display="flex" alignItems="center">
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  pr="20px"
                  pl="5px"
                  whiteSpace="nowrap"
                >
                  Sort By
                </Text>
                <Button
                  value="productSold"
                  onClick={handleSortClick}
                  mr="5px"
                  width="120px"
                  color={sortBy === "productSold" ? "orange.400" : "white.500"}
                  border={
                    sortBy === "productSold" ? "1px solid orange" : "none"
                  }
                  _hover={{ color: "orange.400" }}
                  borderRadius="20px"
                >
                  Top Sales
                </Button>
                <Button
                  value="lowProductSold"
                  onClick={handleSortClick}
                  mr="5px"
                  width="120px"
                  color={
                    sortBy === "lowProductSold" ? "orange.400" : "white.500"
                  }
                  border={
                    sortBy === "lowProductSold" ? "1px solid orange" : "none"
                  }
                  _hover={{ color: "orange.400" }}
                  borderRadius="20px"
                >
                  Low Sales
                </Button>
                <Button
                  value="false"
                  onClick={handleSortClick}
                  mr="5px"
                  width="120px"
                  color={sortBy === "false" ? "orange.400" : "white.500"}
                  border={sortBy === "false" ? "1px solid orange" : "none"}
                  _hover={{ color: "orange.400" }}
                  borderRadius="20px"
                >
                  Listed
                </Button>
                <Button
                  value="true"
                  mr="5px"
                  onClick={handleSortClick}
                  width="120px"
                  color={sortBy === "true" ? "orange.400" : "white.500"}
                  border={sortBy === "true" ? "1px solid orange" : "none"}
                  _hover={{ color: "orange.400" }}
                  borderRadius="20px"
                >
                  Delisted
                </Button>
                <Button
                  value="suspended"
                  onClick={handleSortClick}
                  width="120px"
                  color={sortBy === "suspended" ? "orange.400" : "white.500"}
                  border={sortBy === "suspended" ? "1px solid orange" : "none"}
                  _hover={{ color: "orange.400" }}
                  borderRadius="20px"
                >
                  Suspended
                </Button>
                <Spacer />
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  ml="100px"
                >
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
              </Box>
            </Box>
          </Card>

          {getAllStoreProducts?.data.allProductModels.length === 0 ? (
            <Card borderRadius="none">
              <CardBody>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  height="250px"
                  color="gray.500"
                >
                  <HiOutlineDocumentSearch size="120px" />
                  <Text fontSize="lg">No Product Found</Text>
                </Box>
              </CardBody>
            </Card>
          ) : (
            <>
              {getAllStoreProducts?.data.allProductModels.map((product) => (
                <Box key={product.productId}>
                  <ProductsList
                    product={product}
                    refetchProducts={refetchProducts}
                  />
                </Box>
              ))}
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
            </>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default MyProductPage;
