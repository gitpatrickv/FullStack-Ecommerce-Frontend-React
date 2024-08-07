import {
  Box,
  Divider,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import FollowingShopList from "../../components/Shop/user/FollowingShopList";
import useGetAllFollowedStore from "../../hooks/user/useGetAllFollowedStore";

const MyFollowingPage = () => {
  const { data: getFollowedStoreList } = useGetAllFollowedStore();

  return (
    <Grid
      templateRows="0.3fr 1fr"
      templateColumns="1fr  "
      templateAreas={`
   "header"
  "content1"
`}
      gap={5}
      p={5}
    >
      <GridItem area="header">
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Text fontSize="xl" fontWeight="semibold">
            My Following Shops
          </Text>
          <Text fontSize="md" whiteSpace="nowrap">
            Stay updated with the latest products and offers from your favorite
            shops.
          </Text>
          <Text fontSize="md" whiteSpace="nowrap">
            Follow your preferred stores and easily access them anytime,
            ensuring a personalized and enjoyable shopping experience.
          </Text>
          <Divider pt="15px" />
        </Box>
      </GridItem>

      <GridItem area="content1">
        <SimpleGrid columns={{ base: 2 }} spacing={2} minW="700px">
          {getFollowedStoreList?.map((list) => (
            <FollowingShopList key={list.storeFollowerId} list={list} />
          ))}
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export default MyFollowingPage;
