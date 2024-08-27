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
import { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { useParams } from "react-router-dom";
import useFollowStore from "../../hooks/user/useFollowStore";
import useGetFollowedStoreStatus from "../../hooks/user/useGetFollowedStoreStatus";
import useGetStoreFollowerCount from "../../hooks/user/useGetStoreFollowerCount";
import useGetStoreRating from "../../hooks/user/useGetStoreRating";
import { useAuthQueryStore } from "../../store/auth-store";
import { useChatStore } from "../../store/chat-store";
import useCreateChat from "../../hooks/user/useCreateChat";

interface Props {
  storePhotoUrl: string;
  storeName: string;
}

const StoreHeader = ({ storePhotoUrl, storeName }: Props) => {
  const { storeId } = useParams();
  const { data: storeRating } = useGetStoreRating(storeId!);
  const { data: storeFollowerCount } = useGetStoreFollowerCount(storeId!);
  const { mutate: followStore } = useFollowStore();
  const { mutate: chatNow } = useCreateChat();
  const { data: getFollowedStatus } = useGetFollowedStoreStatus(storeId!);
  const [isHovered, setIsHovered] = useState(false);
  const { authStore } = useAuthQueryStore();
  const role = authStore.role;
  const { maximizeChat } = useChatStore();
  const [isFollowed, setIsFollowed] = useState<boolean>(
    getFollowedStatus?.followed || false
  );

  useEffect(() => {
    setIsFollowed(getFollowedStatus?.followed || false);
  }, [getFollowedStatus?.followed]);

  const handleFollowStoreClick = () => {
    followStore(storeId!);
    setIsFollowed(!isFollowed);
  };

  const handleChatNowClick = () => {
    chatNow({ recipient: storeId! });
    maximizeChat();
  };

  return (
    <Card borderRadius="none" mb="5px">
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
              <Box
                display="flex"
                flexDirection="column"
                minWidth="180px"
                maxWidth="350px"
              >
                <Text
                  fontSize="x-large"
                  fontWeight="semibold"
                  textTransform="capitalize"
                  mr="20px"
                  ml="15px"
                  isTruncated
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
                    width="150px"
                    onClick={handleFollowStoreClick}
                    isDisabled={
                      role === "USER" || role === "SELLER" ? false : true
                    }
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <Text pl="5px" fontSize="medium" mb="3px">
                      {isFollowed === true ? (
                        <>{isHovered ? "Unfollow" : "Following"}</>
                      ) : (
                        <>
                          <Text as="span" fontSize="lg" mr="3px">
                            +
                          </Text>
                          Follow
                        </>
                      )}
                    </Text>
                  </Button>
                  <Button
                    cursor="pointer"
                    display="flex"
                    _hover={{ color: "orange.400" }}
                    mt="10px"
                    ml="15px"
                    width="150px"
                    isDisabled={
                      role === "SELLER" || role === "USER" ? false : true
                    }
                    onClick={handleChatNowClick}
                  >
                    <Text pl="5px" fontSize="medium" mb="2px">
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
                {storeRating?.createdDate || ""}
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
                {storeFollowerCount?.storeFollowerCount ?? 0}
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
