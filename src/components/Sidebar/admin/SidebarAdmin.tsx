import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const SidebarAdmin = () => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });
  const [isShopPage, setIsShopPage] = useState(true);
  const location = useLocation();

  const toggleShopSection = () => {
    setIsShopPage((prev) => !prev);
  };

  return (
    <Box ml="10px" mt="15px">
      <Box
        display="flex"
        alignItems="center"
        onClick={toggleShopSection}
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
            Shop
          </Text>
        </Link>
        {location.pathname.startsWith("/admin/shop") ? (
          <IoIosArrowDown
            color={
              location.pathname.startsWith("/admin/shop") ? "orange" : "white"
            }
          />
        ) : (
          <IoIosArrowUp />
        )}
      </Box>
      {isShopPage && (
        <>
          <Box ml="25px">
            <Link to="/admin/shop/list">
              <Text
                fontSize={fontSize}
                mb="3px"
                mt="3px"
                color={
                  location.pathname === "/admin/shop/list"
                    ? "orange.400"
                    : "white.500"
                }
                cursor="pointer"
                whiteSpace="nowrap"
              >
                Shop List
              </Text>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
};
export default SidebarAdmin;
