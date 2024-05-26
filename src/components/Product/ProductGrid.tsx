import { Box, Button, HStack, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductCardContainer from "./ProductCardContainer";
const ProductGrid = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 50;

  const { data, isLoading, error } = useProducts({ pageNo: page, pageSize });

  const totalElements = data?.data.pageResponse.totalElements ?? 0;
  const totalPages = data?.data.pageResponse.totalPages ?? 0;
  const currentPage = data?.data.pageResponse.pageNo ?? 0;
  const isLastPage = data?.data.pageResponse.last ?? false;

  const pages = Math.ceil(totalElements / pageSize);
  const selectPage = [...Array(pages + 1).keys()].slice(1);

  if (isLoading) return <Spinner />;
  if (error || !data) throw error;

  const handleClickPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleClickNextPage = () => {
    if (!isLastPage) {
      setPage(page + 1);
    }
  };

  const handleClickPage = (index: number) => {
    setPage(index);
  };

  return (
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
      <Box display="flex" justifyContent="center" alignItems="center">
        <HStack>
          <Button onClick={handleClickPrevPage}>Prev</Button>

          {selectPage.map((number, index) => (
            <Button
              key={index}
              color={page === number ? "blue.500" : "gray.500"}
              onClick={() => handleClickPage(number)}
            >
              {number}
            </Button>
          ))}

          <Button onClick={handleClickNextPage}>Next</Button>
        </HStack>
      </Box>
    </SimpleGrid>
  );
};

export default ProductGrid;
