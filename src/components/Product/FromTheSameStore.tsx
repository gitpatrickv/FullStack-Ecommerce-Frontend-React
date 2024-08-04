import { Box, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCardContainer from "../../components/Product/ProductCardContainer";
import ProductCardSkeleton from "../../components/Product/ProductCardSkeleton";
import useGetAllStoreProducts from "../../hooks/user/useGetAllStoreProducts";
import { useAuthQueryStore } from "../../store/auth-store";
import StoreProductCard from "./StoreProductCard";

interface Props {
  storeId: string;
}

const FromTheSameStore = ({ storeId }: Props) => {
  const { authStore } = useAuthQueryStore();
  const role = authStore.role;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const [sortBy, setSortBy] = useState("");
  const { data: getAllStoreProducts, isLoading } = useGetAllStoreProducts({
    storeId: storeId,
    pageNo: page,
    pageSize,
    sortBy: sortBy,
  });

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const handleNavigateStorePageClick = (storeId: string) => {
    navigate(`/store/` + storeId);
  };

  return (
    <Grid
      templateColumns="1fr"
      templateAreas={`
    "content1 "
    `}
    >
      <GridItem area="content1">
        <Box display="flex" justifyContent="flex-end">
          <Text
            onClick={() => handleNavigateStorePageClick(storeId)}
            color="orange.400"
            cursor="pointer"
            mb="5px"
            fontSize="md"
          >
            See all &raquo;
          </Text>
        </Box>
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
          {getAllStoreProducts?.data.allProductModels.map(
            (product) =>
              (role === "ADMIN" || !product.suspended) && (
                <ProductCardContainer key={product.productId}>
                  <StoreProductCard product={product} />
                </ProductCardContainer>
              )
          )}
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export default FromTheSameStore;
