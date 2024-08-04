import {
  Box,
  Button,
  Card,
  Divider,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShopList from "../../components/Shop/admin/ShopList";
import ShopListHeader from "../../components/Shop/admin/ShopListHeader";
import { useGetAllStore } from "../../hooks/admin/useGetAllStore";
import { paginationRange } from "../../utilities/pagination";

const ShopListPage = () => {
  const getPageFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = params.get("pageNo");
    return pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(getPageFromUrl);
  const pageSize = 5;
  const { data: getAllStore, refetch: refetchStore } = useGetAllStore({
    pageNo: page,
    pageSize,
    sortBy: sortBy,
  });

  const cPage = getAllStore?.pageResponse.pageNo ?? 0;
  const currentPage = cPage + 1;
  const totalPages = getAllStore?.pageResponse.totalPages ?? 0;
  const isLastPage = getAllStore?.pageResponse.last ?? false;
  const totalElements = getAllStore?.pageResponse.totalElements ?? 0;
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
    navigate(`/admin/shop/list?pageNo=${newPage}&pageSize=${pageSize}`);
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
    navigate(
      `/admin/shop/list?pageNo=1&pageSize=${pageSize}&sortBy=${event.target.value}`
    );
  };

  return (
    <>
      <Card borderRadius="none">
        <Box padding={4}>
          <Text fontSize="xl" fontWeight="semibold" mb="10px">
            Shop List
          </Text>
          <Divider mb="15px" />
          <Box display="flex" alignItems="center">
            <Text
              fontSize="lg"
              fontWeight="semibold"
              pr="20px"
              pl="3px"
              whiteSpace="nowrap"
            >
              Sort By
            </Text>
            <Button
              value="true"
              onClick={handleSortClick}
              mr="5px"
              width="120px"
              color={sortBy === "true" ? "orange.400" : "white.500"}
              border={sortBy === "true" ? "1px solid orange" : "none"}
              _hover={{ color: "orange.400" }}
              borderRadius="20px"
            >
              Active
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
              Suspended
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
        </Box>
      </Card>
      <ShopListHeader />
      {getAllStore?.storeModels.map((store) => (
        <ShopList
          key={store.storeId}
          store={store}
          onRefetchStore={refetchStore}
        />
      ))}
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
                  color={page === number ? "orange.500" : "white.500"}
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
    </>
  );
};

export default ShopListPage;
