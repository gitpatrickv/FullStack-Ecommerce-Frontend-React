import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import useGetAllStoreProducts from "../../hooks/user/useGetAllStoreProducts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { paginationRange } from "../../utilities/pagination";
import ProductCardContainer from "../../components/Product/ProductCardContainer";
import ProductCard from "../../components/Product/ProductCard";
import ProductCardSkeleton from "../../components/Product/ProductCardSkeleton";

const StorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { storeId } = useParams();

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
  });
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
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
    navigate(`/store/${storeId}?pageNo=${newPage}&pageSize=${pageSize}`);
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
      templateColumns="0.2fr 0.5fr 0.5fr 0.5fr 0.2fr"
      templateRows="0fr 1fr"
      templateAreas={`
        "asideLeft header1 header1 header1 asideRight"
        "asideLeft content1 content1 content1 asideRight"
      `}
    >
      <GridItem area="header1" mb="15px">
        <Card
          backgroundImage="url('https://t3.ftcdn.net/jpg/02/93/94/22/360_F_293942282_dCV0T2E0411M2J1AHsCzCiKWEx3zYrM2.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <CardBody>
            <Box display="flex" justifyContent="start">
              <Avatar
                src={
                  "https://media.istockphoto.com/id/912819604/vector/storefront-flat-design-e-commerce-icon.jpg?s=612x612&w=0&k=20&c=_x_QQJKHw_B9Z2HcbA2d1FH1U1JVaErOAp2ywgmmoTI="
                }
                size="xl"
              />
              <Text ml="15px" fontSize="x-large" textTransform="capitalize">
                {getAllStoreProducts?.data.allProductModels[0].storeName}
              </Text>
            </Box>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem area="content1">
        <Box>
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
            {getAllStoreProducts?.data.allProductModels.map((product) => (
              <ProductCardContainer key={product.productId}>
                <ProductCard product={product} />
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
        </Box>
      </GridItem>
    </Grid>
  );
};

export default StorePage;
