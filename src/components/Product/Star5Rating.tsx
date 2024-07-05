import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbStarOff } from "react-icons/tb";
import useGet5StarRatingAndReview from "../../hooks/user/useGet5StarRatingAndReview";
import useGetTotalUserRating from "../../hooks/user/useGetTotalUserRating";
import { paginationRange } from "../../utilities/pagination";
import Review from "../Review/Review";

interface Props {
  productId: string;
}

const Star5Rating = ({ productId }: Props) => {
  const [page, setPage] = useState(1);
  const pageSize = 2;
  const { data: userRating } = useGetTotalUserRating(productId);
  const { data: get5StarReviewsAndRating, refetch } =
    useGet5StarRatingAndReview({
      productId,
      pageNo: page,
      pageSize,
    });

  useEffect(() => {
    refetch();
  }, [productId, page, pageSize, refetch]);

  const isLastPage = get5StarReviewsAndRating?.pageResponse.last ?? false;
  const totalElements =
    get5StarReviewsAndRating?.pageResponse.totalElements ?? 0;
  const pages = Math.ceil(totalElements / pageSize);

  const paginationRangeArray = paginationRange({
    totalPage: pages,
    page: page,
    limit: pageSize,
    siblings: 1,
  });

  const updatePage = (newPage: number) => {
    setPage(newPage);
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
      "content1 "
      `}
    >
      <GridItem area="content1">
        <Box>
          {userRating?.total5StarUserRating === 0 ? (
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
                    No Ratings Yet
                  </Text>
                </Box>
              </Box>
            </Box>
          ) : (
            <>
              <Box mt="10px">
                {get5StarReviewsAndRating?.ratingAndReviewModels.map(
                  (review) => (
                    <Box key={review.reviewId}>
                      <Review review={review} />
                      <Divider mb="5px" />
                    </Box>
                  )
                )}
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
            </>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Star5Rating;
