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
interface Props {
  store: Store;
}

const ShopList = ({ store }: Props) => {
  const navigate = useNavigate();
  const handleNavigateStorePageClick = () => {
    navigate(`/store/` + store.storeId);
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
            mt="30px"
            width="250px"
            justifyContent="space-around"
          >
            <Text
              _hover={{ color: "orange.400" }}
              cursor="pointer"
              fontWeight="semibold"
              fontSize="lg"
            >
              Relist
            </Text>

            <Text
              _hover={{ color: "orange.400" }}
              cursor="pointer"
              fontWeight="semibold"
              fontSize="lg"
            >
              Delist
            </Text>
            <Text
              _hover={{ color: "orange.400" }}
              cursor="pointer"
              fontWeight="semibold"
              fontSize="lg"
            >
              Ban
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ShopList;
