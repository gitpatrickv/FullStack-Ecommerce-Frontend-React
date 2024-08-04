import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { IoIosStar } from "react-icons/io";
import { useParams } from "react-router-dom";
import useGetStoreRating from "../../hooks/user/useGetStoreRating";

interface Props {
  storePhotoUrl: string;
  storeName: string;
}

const StoreHeader = ({ storePhotoUrl, storeName }: Props) => {
  const { storeId } = useParams();
  const { data: storeRating } = useGetStoreRating(storeId!);
  return (
    <Card borderRadius="none" minWidth="1000px">
      <CardBody>
        <Grid
          templateColumns="0.3fr 0.3fr 0.3fr 0.3fr"
          templateAreas={`
    "content1 content2 content3 content4"
  `}
        >
          <GridItem area="content1">
            <Box display="flex">
              <Avatar
                src={
                  storePhotoUrl ||
                  "https://media.istockphoto.com/id/912819604/vector/storefront-flat-design-e-commerce-icon.jpg?s=612x612&w=0&k=20&c=_x_QQJKHw_B9Z2HcbA2d1FH1U1JVaErOAp2ywgmmoTI="
                }
                size="xl"
              />
              <Box display="flex" flexDirection="column">
                <Text
                  fontSize="x-large"
                  fontWeight="semibold"
                  textTransform="capitalize"
                  mr="20px"
                  ml="15px"
                >
                  {storeName}
                </Text>
                <Box display="flex">
                  <Button
                    cursor="pointer"
                    display="flex"
                    _hover={{ color: "orange.400" }}
                    mt="10px"
                    ml="15px"
                    isDisabled={true}
                    width="150px"
                  >
                    <Text pl="5px" fontSize="medium">
                      Follow
                    </Text>
                  </Button>
                  <Button
                    cursor="pointer"
                    display="flex"
                    _hover={{ color: "orange.400" }}
                    mt="10px"
                    ml="15px"
                    isDisabled={true}
                    width="150px"
                  >
                    <Text pl="5px" fontSize="medium">
                      Chat Now
                    </Text>
                  </Button>
                </Box>
              </Box>

              <Center maxHeight="100%" ml="20px" mr="20px">
                <Divider orientation="vertical" />
              </Center>
            </Box>
          </GridItem>

          <GridItem area="content2">
            <Box display="flex" mt="15px" alignItems="center" minWidth="150px">
              <IoIosStar size="20px" />
              <Text mr="10px" ml="5px" fontWeight="semibold" fontSize="md">
                Rating
              </Text>
              <Text fontWeight="semibold" fontSize="md" color="orange.500">
                {storeRating?.storeRatingAvg} (
                <Text fontWeight="semibold" fontSize="md" as="span">
                  {storeRating?.storeTotalRating}
                </Text>
                )
              </Text>
            </Box>
            <Box display="flex" mt="15px" alignItems="center">
              <Text mr="14px" ml="5px" fontWeight="semibold" fontSize="md">
                Products
              </Text>
              <Text fontWeight="semibold" fontSize="md" color="orange.500">
                {storeRating?.productCount}
              </Text>
            </Box>
          </GridItem>
          <GridItem area="content3">
            <Box display="flex" mt="15px" alignItems="center">
              <Text
                mr="16px"
                ml="5px"
                fontWeight="semibold"
                fontSize="md"
                whiteSpace="nowrap"
              >
                Response Rate
              </Text>
              <Text fontWeight="semibold" fontSize="md" color="orange.500">
                100%
              </Text>
            </Box>
            <Box display="flex" mt="15px" alignItems="center">
              <Text
                mr="14px"
                ml="5px"
                fontWeight="semibold"
                fontSize="md"
                whiteSpace="nowrap"
              >
                Response Time
              </Text>
              <Text
                fontWeight="semibold"
                fontSize="md"
                color="orange.500"
                whiteSpace="nowrap"
              >
                within hours
              </Text>
              <Text fontWeight="semibold" fontSize="md"></Text>
            </Box>
          </GridItem>
          <GridItem area="content4" ml="80px">
            <Box display="flex" mt="15px" alignItems="center">
              <Text
                mr="27px"
                ml="5px"
                fontWeight="semibold"
                fontSize="md"
                whiteSpace="nowrap"
              >
                Joined
              </Text>
              <Text fontWeight="semibold" fontSize="md" color="orange.500">
                2024
              </Text>
              <Text fontWeight="semibold" fontSize="md"></Text>
            </Box>
            <Box display="flex" mt="15px" alignItems="center">
              <Text
                mr="15px"
                ml="5px"
                fontWeight="semibold"
                fontSize="md"
                whiteSpace="nowrap"
              >
                Follower
              </Text>
              <Text
                fontWeight="semibold"
                fontSize="md"
                color="orange.500"
                whiteSpace="nowrap"
              >
                0
              </Text>
              <Text fontWeight="semibold" fontSize="md"></Text>
            </Box>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default StoreHeader;
