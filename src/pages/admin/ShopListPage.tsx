import { useState } from "react";
import ShopList from "../../components/Shop/admin/ShopList";
import ShopListHeader from "../../components/Shop/admin/ShopListHeader";
import { useGetAllStore } from "../../hooks/admin/useGetAllStore";
import { useNavigate } from "react-router-dom";
import { Card, Box, Button, Text } from "@chakra-ui/react";

const ShopListPage = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("");
  const { data: getAllStore, refetch: refetchStore } = useGetAllStore(sortBy);

  const handleSortClick = (event: any) => {
    setSortBy(event.target.value);
    navigate(`/admin/shop/list?sortBy=${event.target.value}`);
  };

  return (
    <>
      <Card borderRadius="none">
        <Box padding={4}>
          <Box display="flex" alignItems="center">
            <Text
              fontSize="lg"
              fontWeight="semibold"
              pr="20px"
              pl="3px"
              whiteSpace="nowrap"
            >
              Sort By
            </Text>
            <Button
              value="true"
              onClick={handleSortClick}
              mr="5px"
              width="120px"
              color={sortBy === "true" ? "orange.400" : "white.500"}
              border={sortBy === "true" ? "1px solid orange" : "none"}
              _hover={{ color: "orange.400" }}
              borderRadius="20px"
            >
              Active
            </Button>
            <Button
              value="false"
              onClick={handleSortClick}
              mr="5px"
              width="120px"
              color={sortBy === "false" ? "orange.400" : "white.500"}
              border={sortBy === "false" ? "1px solid orange" : "none"}
              _hover={{ color: "orange.400" }}
              borderRadius="20px"
            >
              Suspended
            </Button>
          </Box>
        </Box>
      </Card>
      <ShopListHeader />
      {getAllStore?.map((store) => (
        <ShopList
          key={store.storeId}
          store={store}
          onRefetchStore={refetchStore}
        />
      ))}
    </>
  );
};

export default ShopListPage;
