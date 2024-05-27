import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { paginationRange } from "../../utilities/pagination.ts";
import ProductCard from "./ProductCard";
import ProductCardContainer from "./ProductCardContainer";
const ProductGrid = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(2);
  const pageSize = 25;

  const { data, isLoading, error } = useProducts({ pageNo: page, pageSize });

  const totalPages = data?.data.pageResponse.totalPages ?? 0;
  const currentPage = data?.data.pageResponse.pageNo ?? 0;

  const isLastPage = data?.data.pageResponse.last ?? false;
  const totalElements = data?.data.pageResponse.totalElements ?? 0;
  const pages = Math.ceil(totalElements / pageSize);

  const paginationRangeArray = paginationRange({
    totalPage: pages,
    page,
    limit: pageSize,
    siblings: 1,
  });

  if (isLoading) return <Spinner />;
  if (error || !data) throw error;

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
    <>
      <Box display="flex" justifyContent="center" alignItems="center" pt="20px">
        <HStack justifyContent="center">
          <Button onClick={() => handlePageChange("&laquo;")}>&laquo;</Button>
          <Button onClick={() => handlePageChange("&lsaquo;")}>&lsaquo;</Button>
          {paginationRangeArray.map((number, index) => {
            if (number === number) {
              return (
                <Button
                  key={index}
                  onClick={() => handlePageChange(number)}
                  color={page === number ? "blue.500" : "gray.500"}
                >
                  {number}
                </Button>
              );
            }
          })}
          <Button onClick={() => handlePageChange("&rsaquo;")}>&rsaquo;</Button>
          <Button onClick={() => handlePageChange("&raquo;")}>&raquo;</Button>
        </HStack>
      </Box>
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
    </>
  );
};

export default ProductGrid;
