import {
  Box,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const [isOrderPage, setIsOrderPage] = useState(false);
  const [isProductPage, setIsProductPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOrderPage(location.pathname.startsWith("/seller/order"));
    setIsProductPage(location.pathname.startsWith("/seller/product"));
  }, [location.pathname]);

  return (
    <Grid
      templateColumns="0.2fr 1fr 0.2fr"
      templateRows="0fr 1fr"
      templateAreas={`
  "header header header"
  "sidebar content1 sidebar1"
`}
    >
      <GridItem area="sidebar">
        <Box ml="10px" mt="15px">
          <Box display="flex" alignItems="center">
            <FaRegFileAlt
              size="20px"
              color={
                location.pathname.startsWith("/seller/order")
                  ? "orange"
                  : "white"
              }
            />
            <Link to="/seller/order/all">
              <Text
                ml="5px"
                mr="5px"
                fontSize={fontSize}
                fontWeight="semibold"
                _hover={{ color: "orange.400" }}
                color={
                  location.pathname.startsWith("/seller/order")
                    ? "orange"
                    : "white"
                }
              >
                Orders
              </Text>
            </Link>
            {location.pathname.startsWith("/seller/order") ? (
              <IoIosArrowDown
                color={
                  location.pathname.startsWith("/seller/order")
                    ? "orange"
                    : "white"
                }
              />
            ) : (
              <IoIosArrowUp />
            )}
          </Box>
          {isOrderPage && (
            <>
              <Box ml="25px">
                <Link to="/seller/order/all">
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    mt="3px"
                    color={
                      location.pathname === "/seller/order/all"
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                  >
                    All
                  </Text>
                </Link>
                <Link to="/seller/order/unpaid">
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    color={
                      location.pathname === "/seller/order/unpaid"
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                  >
                    Unpaid
                  </Text>
                </Link>
                <Link to="/seller/order/to-ship">
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    color={
                      location.pathname === "/seller/order/to-ship"
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                  >
                    Mass Ship
                  </Text>
                </Link>
                <Link to="/seller/order/shipping">
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    color={
                      location.pathname === "/seller/order/shipping"
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                  >
                    Shipping
                  </Text>
                </Link>
                <Link to="/seller/order/completed">
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    color={
                      location.pathname === "/seller/order/completed"
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                  >
                    Completed
                  </Text>
                </Link>
                <Link to="/seller/order/cancellation">
                  <Text
                    fontSize={fontSize}
                    color={
                      location.pathname === "/seller/order/cancellation"
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                  >
                    Cancellation
                  </Text>
                </Link>
              </Box>
            </>
          )}
        </Box>
        <Box ml="10px" mt="15px">
          <Box display="flex" alignItems="center">
            <FaShoppingBag
              size="20px"
              color={
                location.pathname.startsWith("/seller/product")
                  ? "orange"
                  : "white"
              }
            />
            <Link to="/seller/product">
              <Text
                ml="5px"
                mr="5px"
                fontSize={fontSize}
                fontWeight="semibold"
                _hover={{ color: "orange.400" }}
                color={
                  location.pathname.startsWith("/seller/product")
                    ? "orange"
                    : "white"
                }
              >
                Product
              </Text>
            </Link>
            {location.pathname.startsWith("/seller/product") ? (
              <IoIosArrowDown
                color={
                  location.pathname.startsWith("/seller/product")
                    ? "orange"
                    : "white"
                }
              />
            ) : (
              <IoIosArrowUp />
            )}
          </Box>
          {isProductPage && (
            <>
              <Box ml="25px">
                <Link to="/seller/product">
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    mt="3px"
                    color={
                      location.pathname === "/seller/product"
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                    whiteSpace="nowrap"
                  >
                    My Products
                  </Text>
                </Link>
                <Link to="/seller/product/new">
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    color={
                      location.pathname === "/seller/product/new"
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                    whiteSpace="nowrap"
                  >
                    Add New Product
                  </Text>
                </Link>
              </Box>
            </>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Sidebar;
