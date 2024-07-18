import {
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbStarOff } from "react-icons/tb";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReviewManagement from "../../components/Review/seller/ReviewManagement";
import ReviewManagementHeader from "../../components/Review/seller/ReviewManagementHeader";
import useManageAllProductReview from "../../hooks/seller/useManageAllProductReview";
import { paginationRange } from "../../utilities/pagination";

const ReviewManagementPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { storeId } = useParams();

  const getPageFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = params.get("pageNo");
    return pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
  };

  const [page, setPage] = useState(getPageFromUrl);
  const pageSize = 4;
  const [sortBy, setSortBy] = useState("");

  const { data: manageReview, refetch: refetchReviews } =
    useManageAllProductReview({
      storeId: storeId!,
      pageNo: page,
      pageSize,
      sortBy: sortBy,
    });

  const isLastPage = manageReview?.pageResponse.last ?? false;
  const totalElements = manageReview?.pageResponse.totalElements ?? 0;
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
      `/seller/customer/service/review/${storeId}?pageNo=${newPage}&pageSize=${pageSize}&sortBy=${sortBy}`
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
      `/seller/customer/service/review/${storeId}?pageNo=1&pageSize=${pageSize}&sortBy=${event.target.value}`
    );
  };

  return (
    <Grid
      templateColumns="1fr"
      templateAreas={`
"main"
`}
      mt="20px"
      ml="15px"
    >
      <GridItem area="main">
        <Card mb="5px">
          <Box border="1px solid" padding={5} borderColor="gray.500">
            <Text fontSize="xl" fontWeight="semibold">
              Shop Rating List
            </Text>
            <Box display="flex" alignItems="center" mt="10px">
              <Text fontSize="lg" fontWeight="semibold" pr="20px">
                Status
              </Text>
              <Button
                value="createdDate"
                onClick={handleSortClick}
                mr="5px"
                width="120px"
                _hover={{ color: "orange.400" }}
                borderRadius="20px"
              >
                All
              </Button>
              <Button
                value="true"
                onClick={handleSortClick}
                mr="5px"
                width="120px"
                _hover={{ color: "orange.400" }}
                borderRadius="20px"
              >
                To Reply
              </Button>
              <Button
                value="false"
                onClick={handleSortClick}
                width="120px"
                _hover={{ color: "orange.400" }}
                borderRadius="20px"
              >
                Replied
              </Button>
            </Box>
          </Box>
        </Card>
        <ReviewManagementHeader />
        {manageReview?.ratingAndReviewModels.length === 0 ? (
          <Box>
            <Box
              height="250px"
              maxWidth="100%"
              display="flex"
              justifyContent="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
              >
                <TbStarOff size="100px" />
                <Text fontSize="lg" mt="10px">
                  You have not received any ratings from buyers.
                </Text>
              </Box>
            </Box>
          </Box>
        ) : (
          <>
            <Box>
              {manageReview?.ratingAndReviewModels.map((review) => (
                <ReviewManagement
                  key={review.reviewId}
                  ratingAndReviews={review}
                  onRefetchReviews={refetchReviews}
                />
              ))}
            </Box>
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
      </GridItem>
    </Grid>
  );
};

export default ReviewManagementPage;
