import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Store from "../../../entities/Store";
import { FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useToggleStoreAndProductListing from "../../../hooks/admin/useToggleStoreAndProductListing";
interface Props {
  store: Store;
  onRefetchStore: () => void;
}

const ShopList = ({ store, onRefetchStore }: Props) => {
  const navigate = useNavigate();
  const { mutate: toggleShopListing } = useToggleStoreAndProductListing();
  const handleNavigateStorePageClick = () => {
    navigate(`/store/` + store.storeId);
  };

  const handleSuspendClick = () => {
    toggleShopListing(store.storeId, {
      onSuccess: () => {
        onRefetchStore();
      },
    });
  };
  return (
    <Card mt="5px">
      <Grid
        templateColumns="0.2fr 1fr 0.2fr"
        templateAreas={`
  "header header header"
  "asideLeft content1 asideRight"
`}
      >
        <GridItem
          area="header"
          height="45px"
          border="1px solid"
          borderColor="gray.500"
        >
          <Box display="flex" ml="10px" mt="10px">
            <Avatar
              src={
                store.photoUrl ||
                "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
              }
              size="xs"
            />
            <Text ml="5px" textTransform="capitalize" fontWeight="semibold">
              {store.storeName}
            </Text>
            <Spacer />
            <Box
              cursor="pointer"
              display="flex"
              alignItems="center"
              _hover={{ color: "orange.400" }}
              mr="10px"
              onClick={handleNavigateStorePageClick}
            >
              <FaStore size="20px" />
              <Text pl="5px" fontSize="md">
                View Store
              </Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem area="asideLeft" border="1px solid" borderColor="gray.500">
          <Box display="flex" ml="10px" mt="5px" mb="5px" width="150px">
            <Box display="flex" flexDirection="column">
              <Text fontWeight="semibold">Total Products:</Text>
              <Text fontWeight="semibold">Total Orders:</Text>
              <Text fontWeight="semibold">Shipping Fee:</Text>
            </Box>
            <Box display="flex" flexDirection="column">
              <Text fontWeight="semibold" ml="10px">
                {store.productCount}
              </Text>
              <Text fontWeight="semibold" ml="10px">
                {store.orderCount}
              </Text>
              <Text fontWeight="semibold" ml="10px">
                {store.shippingFee}
              </Text>
            </Box>
          </Box>
        </GridItem>

        <GridItem
          area="content1"
          borderRight="1px solid"
          border="1px solid"
          borderColor="gray.500"
        >
          <Box minWidth="600px" mt="5px" mb="5px" display="flex" ml="10px">
            <Box display="flex" flexDirection="column">
              <Text fontWeight="semibold">Contact #:</Text>
              <Text fontWeight="semibold">Email:</Text>
              <Text fontWeight="semibold">Address:</Text>
            </Box>
            <Box display="flex" flexDirection="column">
              <Text fontWeight="semibold" ml="10px">
                {store.contactNumber}
              </Text>
              <Text fontWeight="semibold" ml="10px">
                {store.email}
              </Text>
              <Text fontWeight="semibold" ml="10px">
                {store.address}
              </Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem area="asideRight" border="1px solid" borderColor="gray.500">
          <Box
            display="flex"
            mt="22px"
            width="250px"
            justifyContent="space-around"
          >
            <Button
              cursor="pointer"
              fontWeight="semibold"
              fontSize="lg"
              bg={store.online === true ? "red.500" : "orange.500"}
              _hover={
                store.online === true ? { bg: "red.600" } : { bg: "orange.600" }
              }
              width="120px"
              onClick={handleSuspendClick}
            >
              {store.online === true ? "Suspend" : "Resume"}
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ShopList;
