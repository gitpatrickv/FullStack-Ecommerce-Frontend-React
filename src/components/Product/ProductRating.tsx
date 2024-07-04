import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { TbStarOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import useGet1StarRatingAndReview from "../../hooks/user/useGet1StarRatingAndReview";
import useGet2StarRatingAndReview from "../../hooks/user/useGet2StarRatingAndReview";
import useGet3StarRatingAndReview from "../../hooks/user/useGet3StarRatingAndReview";
import useGet4StarRatingAndReview from "../../hooks/user/useGet4StarRatingAndReview";
import useGet5StarRatingAndReview from "../../hooks/user/useGet5StarRatingAndReview";
import useGetAllRatingAndReview from "../../hooks/user/useGetAllRatingAndReview";
import useGetProductRatingAvg from "../../hooks/user/useGetProductRatingAvg";
import useGetTotalUserRating from "../../hooks/user/useGetTotalUserRating";
import Review from "../Review/Review";

interface Props {
  productId: string;
}

const ProductRating = ({ productId }: Props) => {
  const navigate = useNavigate();
  const ratings = [1, 2, 3, 4, 5];
  const { data: rating } = useGetProductRatingAvg(productId);
  const ratingAvg = rating?.ratingAverage ?? 0;
  const { data: userRating } = useGetTotalUserRating(productId);
  const { data: getAllReviewsAndRating, refetch: refetchAllRating } =
    useGetAllRatingAndReview(productId);
  const { data: get5StarReviewsAndRating, refetch: refetch5Rating } =
    useGet5StarRatingAndReview(productId);
  const { data: get4StarReviewsAndRating, refetch: refetch4Rating } =
    useGet4StarRatingAndReview(productId);
  const { data: get3StarReviewsAndRating, refetch: refetch3Rating } =
    useGet3StarRatingAndReview(productId);
  const { data: get2StarReviewsAndRating, refetch: refetch2Rating } =
    useGet2StarRatingAndReview(productId);
  const { data: get1StarReviewsAndRating, refetch: refetch1Rating } =
    useGet1StarRatingAndReview(productId);

  const productRatingsRef = useRef<HTMLDivElement>(null);
  const [selectedRating, setSelectedRating] = useState("All");

  const handleSelectedRatingClick = async (event: any) => {
    const newSelectedRating = event.target.value;
    setSelectedRating(newSelectedRating);

    if (productRatingsRef.current) {
      productRatingsRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (newSelectedRating === "All") {
      await refetchAllRating();
    } else if (newSelectedRating === "5") {
      await refetch5Rating();
    } else if (newSelectedRating === "4") {
      await refetch4Rating();
    } else if (newSelectedRating === "3") {
      await refetch3Rating();
    } else if (newSelectedRating === "2") {
      await refetch2Rating();
    } else if (newSelectedRating === "1") {
      await refetch1Rating();
    }
  };

  return (
    <Grid
      templateColumns="1fr"
      templateAreas={`
  "content1 "
`}
    >
      <GridItem area="content1">
        <Box mt="15px" ref={productRatingsRef}>
          <Card>
            <CardBody>
              <Text
                fontSize="x-large"
                fontWeight="semibold"
                textTransform="capitalize"
                mb="10px"
                color="orange.400"
              >
                Product Ratings
              </Text>

              <Card>
                <CardBody>
                  <Box display="flex">
                    <Box
                      display="flex"
                      flexDirection="column"
                      mr="40px"
                      position="relative"
                      bottom="5px"
                    >
                      <Box display="flex" alignItems="center">
                        <Text color="orange.400" fontSize="x-large" mr="5px">
                          {rating?.ratingAverage || 0}
                        </Text>
                        <Text color="orange.400" fontSize="large">
                          out of 5
                        </Text>
                      </Box>
                      {rating?.ratingAverage === 0 ||
                      rating?.totalNumberOfUserRating === 0 ? (
                        <Box>
                          <Text mr="10px">No Ratings Yet</Text>
                        </Box>
                      ) : (
                        <Box display="flex">
                          {ratings.map((rate) => (
                            <Box
                              as={IoIosStar}
                              color={
                                rate <= ratingAvg ? "orange.400" : "gray.600"
                              }
                              key={rate}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                    <Box position="relative" top="7px">
                      <Button
                        width="120px"
                        mr="10px"
                        value="All"
                        onClick={handleSelectedRatingClick}
                        color={
                          selectedRating === "All" ? "orange.400" : "gray.200"
                        }
                      >
                        All ({rating?.totalNumberOfUserRating || 0})
                      </Button>
                      <Button
                        width="120px"
                        mr="10px"
                        value="5"
                        onClick={handleSelectedRatingClick}
                        color={
                          selectedRating === "5" ? "orange.400" : "gray.200"
                        }
                      >
                        5 Star ({userRating?.total5StarUserRating || 0})
                      </Button>
                      <Button
                        width="120px"
                        mr="10px"
                        value="4"
                        onClick={handleSelectedRatingClick}
                        color={
                          selectedRating === "4" ? "orange.400" : "gray.200"
                        }
                      >
                        4 Star ({userRating?.total4StarUserRating || 0})
                      </Button>
                      <Button
                        width="120px"
                        mr="10px"
                        value="3"
                        onClick={handleSelectedRatingClick}
                        color={
                          selectedRating === "3" ? "orange.400" : "gray.200"
                        }
                      >
                        3 Star ({userRating?.total3StarUserRating || 0})
                      </Button>
                      <Button
                        width="120px"
                        mr="10px"
                        value="2"
                        onClick={handleSelectedRatingClick}
                        color={
                          selectedRating === "2" ? "orange.400" : "gray.200"
                        }
                      >
                        2 Star ({userRating?.total2StarUserRating || 0})
                      </Button>
                      <Button
                        width="120px"
                        mr="10px"
                        value="1"
                        onClick={handleSelectedRatingClick}
                        color={
                          selectedRating === "1" ? "orange.400" : "gray.200"
                        }
                      >
                        1 Star ({userRating?.total1StarUserRating || 0})
                      </Button>
                    </Box>
                  </Box>
                </CardBody>
              </Card>
              <Box>
                <Box>
                  {selectedRating === "All" && (
                    <>
                      {userRating?.overallTotalUserRating === 0 ? (
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
                        <Box mt="10px">
                          {getAllReviewsAndRating?.map((review) => (
                            <Box key={review.reviewId}>
                              <Review review={review} />
                              <Divider mb="5px" />
                            </Box>
                          ))}
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </Box>
              <Box>
                {selectedRating === "5" && (
                  <>
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
                      <Box mt="10px">
                        {get5StarReviewsAndRating?.map((review) => (
                          <Box key={review.reviewId}>
                            <Review review={review} />
                            <Divider mb="5px" />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </>
                )}
              </Box>
              <Box>
                {selectedRating === "4" && (
                  <>
                    {userRating?.total4StarUserRating === 0 ? (
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
                      <Box mt="10px">
                        {get4StarReviewsAndRating?.map((review) => (
                          <Box key={review.reviewId}>
                            <Review review={review} />
                            <Divider mb="5px" />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </>
                )}
              </Box>
              <Box>
                {selectedRating === "3" && (
                  <>
                    {userRating?.total3StarUserRating === 0 ? (
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
                      <Box mt="10px">
                        {get3StarReviewsAndRating?.map((review) => (
                          <Box key={review.reviewId}>
                            <Review review={review} />
                            <Divider mb="5px" />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </>
                )}
              </Box>
              <Box>
                {selectedRating === "2" && (
                  <>
                    {userRating?.total2StarUserRating === 0 ? (
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
                      <Box mt="10px">
                        {get2StarReviewsAndRating?.map((review) => (
                          <Box key={review.reviewId}>
                            <Review review={review} />
                            <Divider mb="5px" />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </>
                )}
              </Box>
              <Box>
                {selectedRating === "1" && (
                  <>
                    {userRating?.total1StarUserRating === 0 ? (
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
                      <Box mt="10px">
                        {get1StarReviewsAndRating?.map((review) => (
                          <Box key={review.reviewId}>
                            <Review review={review} />
                            <Divider mb="5px" />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </CardBody>
          </Card>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ProductRating;
