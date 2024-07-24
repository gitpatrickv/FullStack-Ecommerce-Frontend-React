import { useState } from "react";
import UserList from "../../components/User/admin/UserList";
import { useGetAllUsers } from "../../hooks/admin/useGetAllUsers";
import { useNavigate } from "react-router-dom";
import UserListHeader from "../../components/User/admin/UserListHeader";
import { Card, Box, Button, Text } from "@chakra-ui/react";

const UserListPage = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("");
  const { data: getAllUsers } = useGetAllUsers(sortBy);

  const handleSortClick = (event: any) => {
    setSortBy(event.target.value);
    navigate(`/admin/user/list?sortBy=${event.target.value}`);
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
              value="user"
              onClick={handleSortClick}
              mr="5px"
              width="120px"
              color={sortBy === "user" ? "orange.400" : "white.500"}
              border={sortBy === "user" ? "1px solid orange" : "none"}
              _hover={{ color: "orange.400" }}
              borderRadius="20px"
            >
              User
            </Button>
            <Button
              value="seller"
              onClick={handleSortClick}
              mr="5px"
              width="120px"
              color={sortBy === "seller" ? "orange.400" : "white.500"}
              border={sortBy === "seller" ? "1px solid orange" : "none"}
              _hover={{ color: "orange.400" }}
              borderRadius="20px"
            >
              Seller
            </Button>
          </Box>
        </Box>
      </Card>
      <UserListHeader />
      {getAllUsers?.map((user) => (
        <UserList key={user.email} user={user} />
      ))}
    </>
  );
};

export default UserListPage;
