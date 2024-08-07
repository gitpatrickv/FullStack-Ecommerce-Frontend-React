import {
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  Image,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFollowStore from "../../../hooks/user/useFollowStore";
import { StoreFollowerProps } from "../../../hooks/user/useGetAllFollowedStore";

interface Props {
  list: StoreFollowerProps;
  onRetchFollowing: () => void;
}

const FollowingShopList = ({ list, onRetchFollowing }: Props) => {
  const { mutate: followStore } = useFollowStore();
  const isTruncated = useBreakpointValue({ base: true });
  const fontSize = useBreakpointValue({ base: "sm", lg: "xl" });
  const [isHovered, setIsHovered] = useState(false);

  const handleUnfollowStoreClick = () => {
    followStore(list.storeId);
    onRetchFollowing();
  };

  return (
    <Card borderRadius="none" mb="1px">
      <Grid
        templateColumns="1fr"
        templateAreas={`
 "content1"
`}
        padding={1}
      >
        <GridItem area="content1">
          <Box display="flex" ml="10px" mt="10px" mb="10px" alignItems="center">
            <Link to={`/store/${list.storeId}`}>
              <Box display="flex" alignItems="center">
                <Image
                  src={
                    list.storePhotoUrl ||
                    "https://media.istockphoto.com/id/912819604/vector/storefront-flat-design-e-commerce-icon.jpg?s=612x612&w=0&k=20&c=_x_QQJKHw_B9Z2HcbA2d1FH1U1JVaErOAp2ywgmmoTI="
                  }
                  w={{ base: "50px", md: "90px", lg: "120px" }}
                  h={{ base: "40px", md: "60px", lg: "80px" }}
                  border="solid 1px"
                />

                <Text
                  ml="10px"
                  fontSize={fontSize}
                  textTransform="capitalize"
                  isTruncated={isTruncated}
                >
                  {list.storeName}
                </Text>
              </Box>
            </Link>
            <Spacer />
            <Button
              cursor="pointer"
              display="flex"
              _hover={{ color: "orange.400" }}
              ml="15px"
              mr="10px"
              width="120px"
              onClick={handleUnfollowStoreClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Text pl="5px" fontSize="medium">
                {isHovered ? "Unfollow" : "Following"}
              </Text>
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default FollowingShopList;
