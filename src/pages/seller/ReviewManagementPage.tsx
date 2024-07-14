import { Box, Button, Grid, GridItem, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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

  const { data: manageReview, refetch: refetchReviews } =
    useManageAllProductReview({
      storeId: storeId!,
      pageNo: page,
      pageSize,
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
      `/seller/customer/service/review/${storeId}?pageNo=${newPage}&pageSize=${pageSize}`
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
        <ReviewManagementHeader />
        {manageReview?.ratingAndReviewModels.map((review) => (
          <ReviewManagement
            key={review.reviewId}
            ratingAndReviews={review}
            onRefetchReviews={refetchReviews}
          />
        ))}

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
            <Button onClick={() => handlePageChange("&raquo;")}>&raquo;</Button>
          </HStack>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ReviewManagementPage;
