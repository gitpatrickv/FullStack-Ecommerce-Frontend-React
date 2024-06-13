import {
  Box,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const Sidebar = () => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const [isOrderPage, setIsOrderPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOrderPage(location.pathname.startsWith("/seller/order"));
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
        <Box ml="10px" mt="10px">
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
      </GridItem>
    </Grid>
  );
};

export default Sidebar;
