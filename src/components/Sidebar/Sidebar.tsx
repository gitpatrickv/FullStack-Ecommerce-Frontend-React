import {
  Box,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegFileAlt, FaShoppingBag } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

interface Props {
  storeId: string;
}

const Sidebar = ({ storeId }: Props) => {
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
            <Link to={`/seller/order/all/${storeId}`}>
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
                <Link to={`/seller/order/all/${storeId}`}>
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    mt="3px"
                    color={
                      location.pathname === `/seller/order/all/${storeId}`
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                  >
                    All
                  </Text>
                </Link>
                <Link to={`/seller/order/pending/${storeId}`}>
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    color={
                      location.pathname === `/seller/order/pending/${storeId}`
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                  >
                    Pending
                  </Text>
                </Link>
                <Link to={`/seller/order/unpaid/${storeId}`}>
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    color={
                      location.pathname === `/seller/order/unpaid/${storeId}`
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                  >
                    Unpaid
                  </Text>
                </Link>
                <Link to={`/seller/order/to-ship/${storeId}`}>
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    color={
                      location.pathname === `/seller/order/to-ship/${storeId}`
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                  >
                    Mass Ship
                  </Text>
                </Link>
                <Link to={`/seller/order/shipping/${storeId}`}>
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    color={
                      location.pathname === `/seller/order/shipping/${storeId}`
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                  >
                    Shipping
                  </Text>
                </Link>
                <Link to={`/seller/order/completed/${storeId}`}>
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    color={
                      location.pathname === `/seller/order/completed/${storeId}`
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                  >
                    Completed
                  </Text>
                </Link>
                <Link to={`/seller/order/cancelled/${storeId}`}>
                  <Text
                    fontSize={fontSize}
                    color={
                      location.pathname === `/seller/order/cancelled/${storeId}`
                        ? "orange.400"
                        : "gray.600"
                    }
                    cursor="pointer"
                  >
                    Cancelled
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
