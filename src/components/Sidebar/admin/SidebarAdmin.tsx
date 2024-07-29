import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const SidebarAdmin = () => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const location = useLocation();
  const [isCategoryPage, setIsCategoryPage] = useState(true);

  const toggleCategorySection = () => {
    setIsCategoryPage((prev) => !prev);
  };

  return (
    <Box ml="10px" mt="30px">
      <Box
        display="flex"
        alignItems="center"
        cursor="pointer"
        userSelect="none"
      >
        <IoStorefrontSharp
          size="20px"
          color={
            location.pathname.startsWith("/admin/shop") ? "orange" : "gray"
          }
        />
        <Link to="/admin/shop/list">
          <Text
            ml="5px"
            mr="5px"
            fontSize={fontSize}
            fontWeight="semibold"
            _hover={{ color: "orange.400" }}
            color={
              location.pathname.startsWith("/admin/shop")
                ? "orange.400"
                : "white.500"
            }
          >
            Shops
          </Text>
        </Link>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        cursor="pointer"
        userSelect="none"
        mt="15px"
      >
        <FaUser
          size="20px"
          color={
            location.pathname.startsWith("/admin/user") ? "orange" : "gray"
          }
        />
        <Link to="/admin/user/list">
          <Text
            ml="5px"
            mr="5px"
            fontSize={fontSize}
            fontWeight="semibold"
            _hover={{ color: "orange.400" }}
            color={
              location.pathname.startsWith("/admin/user")
                ? "orange.400"
                : "white.500"
            }
          >
            Users
          </Text>
        </Link>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        cursor="pointer"
        userSelect="none"
        mt="15px"
        onClick={toggleCategorySection}
      >
        <FaUser
          size="20px"
          color={
            location.pathname.startsWith("/admin/category") ? "orange" : "gray"
          }
        />
        <Link to="/admin/category/list">
          <Text
            ml="5px"
            mr="5px"
            fontSize={fontSize}
            fontWeight="semibold"
            _hover={{ color: "orange.400" }}
            color={
              location.pathname.startsWith("/admin/category")
                ? "orange.400"
                : "white.500"
            }
          >
            Category
          </Text>
        </Link>
        {location.pathname.startsWith("/admin/category") ? (
          <IoIosArrowDown
            color={
              location.pathname.startsWith("/admin/category")
                ? "orange"
                : "white"
            }
          />
        ) : (
          <IoIosArrowUp />
        )}
      </Box>
      {isCategoryPage && (
        <>
          <Box ml="25px">
            <Link to="/admin/category/list">
              <Text
                fontSize={fontSize}
                mb="3px"
                mt="3px"
                color={
                  location.pathname === "/admin/category/list"
                    ? "orange.400"
                    : "white.500"
                }
                cursor="pointer"
                whiteSpace="nowrap"
              >
                Category List
              </Text>
            </Link>
            <Link to="/admin/category/create">
              <Text
                fontSize={fontSize}
                mb="3px"
                mt="3px"
                color={
                  location.pathname === "/admin/category/create"
                    ? "orange.400"
                    : "white.500"
                }
                cursor="pointer"
                whiteSpace="nowrap"
              >
                Create Category
              </Text>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
};
export default SidebarAdmin;
