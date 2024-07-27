import { useEffect, useState } from "react";
import UserList from "../../components/User/admin/UserList";
import { useGetAllUsers } from "../../hooks/admin/useGetAllUsers";
import { useLocation, useNavigate } from "react-router-dom";
import UserListHeader from "../../components/User/admin/UserListHeader";
import { Card, Box, Button, Text, HStack, Spacer } from "@chakra-ui/react";
import { paginationRange } from "../../utilities/pagination";

const UserListPage = () => {
  const getPageFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = params.get("pageNo");
    return pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(getPageFromUrl);
  const pageSize = 5;
  const { data: getAllUsers, refetch: refetchUserList } = useGetAllUsers({
    pageNo: page,
    pageSize,
    sortBy: sortBy,
  });

  const cPage = getAllUsers?.pageResponse.pageNo ?? 0;
  const currentPage = cPage + 1;
  const totalPages = getAllUsers?.pageResponse.totalPages ?? 0;
  const isLastPage = getAllUsers?.pageResponse.last ?? false;
  const totalElements = getAllUsers?.pageResponse.totalElements ?? 0;
  const pages = Math.ceil(totalElements / pageSize);

  const paginationRangeArray = paginationRange({
    totalPage: pages,
    page: page,
    limit: pageSize,
    siblings: 1,
  });

  useEffect(() => {
    const pageFromUrl = getPageFromUrl();
    if (pageFromUrl !== page) {
      setPage(pageFromUrl);
    }
  }, [location.search]);

  const updatePage = (newPage: number) => {
    setPage(newPage);
    navigate(`/admin/user/list?pageNo=${newPage}&pageSize=${pageSize}`);
  };

  function handlePageChange(value: any) {
    if (value === "&laquo;" || value === "... ") {
      updatePage(1);
    } else if (value === "&lsaquo;") {
      if (page > 1) {
        updatePage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (!isLastPage) {
        updatePage(page + 1);
      }
    } else if (value === "&raquo;" || value === " ...") {
      updatePage(pages);
    } else {
      updatePage(value);
    }
  }

  const handleSortClick = (event: any) => {
    setSortBy(event.target.value);
    navigate(
      `/admin/user/list?pageNo=1&pageSize=${pageSize}&sortBy=${event.target.value}`
    );
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
              value="admin"
              onClick={handleSortClick}
              mr="5px"
              width="120px"
              color={sortBy === "admin" ? "orange.400" : "white.500"}
              border={sortBy === "admin" ? "1px solid orange" : "none"}
              _hover={{ color: "orange.400" }}
              borderRadius="20px"
            >
              Admin
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
              Active
            </Button>
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
              Frozen
            </Button>
            <Spacer />
            <Text pr="15px" fontSize="medium">
              <Text as="span" color="orange">
                {currentPage}
              </Text>
              /{totalPages}
            </Text>
            <Button mr="2px" onClick={() => handlePageChange("&lsaquo;")}>
              &lsaquo;
            </Button>
            <Button onClick={() => handlePageChange("&rsaquo;")}>
              &rsaquo;
            </Button>
          </Box>
        </Box>
      </Card>
      <UserListHeader />
      {getAllUsers?.userModels.map((user) => (
        <UserList
          key={user.email}
          user={user}
          onRefetchUser={refetchUserList}
        />
      ))}
      <Box display="flex" justifyContent="center" alignItems="center" pt="20px">
        <HStack justifyContent="center">
          <Button onClick={() => handlePageChange("&laquo;")}>&laquo;</Button>
          <Button onClick={() => handlePageChange("&lsaquo;")}>&lsaquo;</Button>
          {paginationRangeArray.map((number, index) => {
            if (number === number) {
              return (
                <Button
                  key={index}
                  onClick={() => handlePageChange(number)}
                  color={page === number ? "orange.500" : "white.500"}
                >
                  {number}
                </Button>
              );
            }
          })}
          <Button onClick={() => handlePageChange("&rsaquo;")}>&rsaquo;</Button>
          <Button onClick={() => handlePageChange("&raquo;")}>&raquo;</Button>
        </HStack>
      </Box>
    </>
  );
};

export default UserListPage;
