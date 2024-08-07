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
import { StoreFollowerProps } from "../../../hooks/user/useGetAllFollowedStore";
import { Link } from "react-router-dom";

interface Props {
  list: StoreFollowerProps;
}

const FollowingShopList = ({ list }: Props) => {
  const isTruncated = useBreakpointValue({ base: true });
  const fontSize = useBreakpointValue({ base: "sm", lg: "xl" });
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
                    "https://img.freepik.com/free-vector/shop-with-sign-we-are-open_52683-38687.jpg"
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
              // onClick={handleFollowStoreClick}
            >
              <Text pl="5px" fontSize="medium">
                Following
              </Text>
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default FollowingShopList;
