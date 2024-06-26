import { Box, Button, Divider, Grid, GridItem, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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

  const [page, setPage] = useState(getPageFromUrl);
  const pageSize = 30;

  const { data: getAllStoreProducts, refetch: refetchProducts } =
    useGetAllSellersProduct({
      jwtToken: jwtToken,
      pageNo: page,
      pageSize,
    });
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
          {getAllStoreProducts?.data.allProductModels.map((product) => (
            <Box key={product.productId}>
              <ProductsList
                product={product}
                refetchProducts={refetchProducts}
              />
              <Divider />
            </Box>
          ))}
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          pt="20px"
        >
          <HStack justifyContent="center">
            <Button onClick={() => handlePageChange("&laquo;")}>&laquo;</Button>
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
            <Button onClick={() => handlePageChange("&raquo;")}>&raquo;</Button>
          </HStack>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default MyProductPage;
