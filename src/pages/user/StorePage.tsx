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
import { FaBan } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductCardContainer from "../../components/Product/ProductCardContainer";
import ProductCardSkeleton from "../../components/Product/ProductCardSkeleton";
import StoreProductCard from "../../components/Product/StoreProductCard";
import StoreHeader from "../../components/Store/StoreHeader";
import useGetAllStoreProducts from "../../hooks/user/useGetAllStoreProducts";
import { useAuthQueryStore } from "../../store/auth-store";
import { paginationRange } from "../../utilities/pagination";

const StorePage = () => {
  const { authStore } = useAuthQueryStore();
  const role = authStore.role;
  const location = useLocation();
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [sortBy, setSortBy] = useState("");
  const getPageFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = params.get("pageNo");
    return pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
  };

  const [page, setPage] = useState(getPageFromUrl);
  const pageSize = 30;

  const { data: getAllStoreProducts, isLoading } = useGetAllStoreProducts({
    storeId: storeId!,
    pageNo: page,
    pageSize,
    sortBy: sortBy,
  });
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
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
    navigate(
      `/store/${storeId}?pageNo=${newPage}&pageSize=${pageSize}&sortBy=${sortBy}`
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
      `/store/${storeId}?pageNo=1&pageSize=${pageSize}&sortBy=${event.target.value}`
    );
  };

  return (
    <>
      {getAllStoreProducts?.data.storeInfo.online === false ? (
        <Grid
          templateColumns="0.2fr 1fr 0.2fr"
          templateAreas={`
           "asideLeft content1 asideRight"
         `}
        >
          <GridItem area="content1">
            <Box display="flex" justifyContent="center" mt="100px">
              <Box display="flex" flexDirection="column" alignItems="center">
                <FaBan size="60px" />
                <Text fontSize="x-large" fontWeight="semibold" mt="20px">
                  This Shop has been banned / frozen from Shopee.
                </Text>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      ) : (
        <Grid
          templateColumns="1fr"
          templateAreas={`
      "content1"
    `}
        >
          <GridItem area="content1" mb="10px">
            <StoreHeader
              storePhotoUrl={
                getAllStoreProducts?.data.storeInfo.storePhotoUrl || ""
              }
              storeName={getAllStoreProducts?.data.storeInfo.storeName || ""}
            />
            <Card p="13px" mb="10px" borderRadius="none">
              <Box display="flex" alignItems="center">
                <Text fontSize="medium" pr="10px">
                  Sort By
                </Text>
                <Button
                  value="createdDate"
                  onClick={handleSortClick}
                  mr="5px"
                  width="120px"
                  color={sortBy === "createdDate" ? "orange.400" : "white.500"}
                  border={
                    sortBy === "createdDate" ? "1px solid orange" : "none"
                  }
                  borderRadius="20px"
                  _hover={{ color: "orange.400" }}
                >
                  Latest
                </Button>
                <Button
                  value="productSold"
                  onClick={handleSortClick}
                  mr="5px"
                  width="120px"
                  color={sortBy === "productSold" ? "orange.400" : "white.500"}
                  border={
                    sortBy === "productSold" ? "1px solid orange" : "none"
                  }
                  borderRadius="20px"
                  _hover={{ color: "orange.400" }}
                >
                  Top Sales
                </Button>
                {role === "ADMIN" && (
                  <Button
                    value="suspended"
                    onClick={handleSortClick}
                    width="120px"
                    color={sortBy === "suspended" ? "orange.400" : "white.500"}
                    border={
                      sortBy === "suspended" ? "1px solid orange" : "none"
                    }
                    borderRadius="20px"
                    _hover={{ color: "orange.400" }}
                  >
                    Suspended
                  </Button>
                )}

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

            <Box>
              <SimpleGrid
                columns={{ base: 6 }}
                spacing={2}
                padding="10px"
                minWidth="1300px"
              >
                {isLoading &&
                  skeletons.map((skeleton) => (
                    <ProductCardContainer key={skeleton}>
                      <ProductCardSkeleton />
                    </ProductCardContainer>
                  ))}
                {getAllStoreProducts?.data.allProductModels.map(
                  (product) =>
                    (role === "ADMIN" || !product.suspended) && (
                      <ProductCardContainer key={product.productId}>
                        <StoreProductCard product={product} />
                      </ProductCardContainer>
                    )
                )}
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
            </Box>
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default StorePage;
