import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { FaHandsHelping, FaRegFileAlt, FaShoppingBag } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

interface Props {
  storeId: string;
}

const Sidebar = ({ storeId }: Props) => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  const [isOrderPage, setIsOrderPage] = useState(true);
  const [isProductPage, setIsProductPage] = useState(true);
  const [isShopPage, setIsShopPage] = useState(true);
  const [isCustomerServicePage, setIsCustomerServicePage] = useState(true);
  const location = useLocation();

  const toggleOrderSection = () => {
    setIsOrderPage((prev) => !prev);
  };

  const toggleProductSection = () => {
    setIsProductPage((prev) => !prev);
  };

  const toggleCustomerServiceSection = () => {
    setIsCustomerServicePage((prev) => !prev);
  };

  const toggleShopSection = () => {
    setIsShopPage((prev) => !prev);
  };

  return (
    <Box>
      <Box ml="10px" mt="30px">
        <Box
          display="flex"
          alignItems="center"
          onClick={toggleOrderSection}
          cursor="pointer"
          userSelect="none"
        >
          <FaRegFileAlt
            size="20px"
            color={
              location.pathname.startsWith("/seller/order") ? "orange" : "gray"
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
                  ? "orange.400"
                  : "white.500"
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
                      : "white.500"
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
                      : "white.500"
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
                      : "white.500"
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
                      : "white.500"
                  }
                  cursor="pointer"
                >
                  To Ship
                </Text>
              </Link>
              <Link to={`/seller/order/shipping/${storeId}`}>
                <Text
                  fontSize={fontSize}
                  mb="3px"
                  color={
                    location.pathname === `/seller/order/shipping/${storeId}`
                      ? "orange.400"
                      : "white.500"
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
                      : "white.500"
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
                      : "white.500"
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
        <Box
          display="flex"
          alignItems="center"
          onClick={toggleProductSection}
          cursor="pointer"
          userSelect="none"
        >
          <FaShoppingBag
            size="20px"
            color={
              location.pathname.startsWith("/seller/product")
                ? "orange"
                : "gray"
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
                  ? "orange.400"
                  : "white.500"
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
                      : "white.500"
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
                      : "white.500"
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

      <Box ml="10px" mt="15px">
        <Box
          display="flex"
          alignItems="center"
          onClick={toggleCustomerServiceSection}
          cursor="pointer"
          userSelect="none"
        >
          <FaHandsHelping
            size="20px"
            color={
              location.pathname.startsWith("/seller/customer/service")
                ? "orange"
                : "gray"
            }
          />

          <Link to={`/seller/customer/service/review/${storeId}`}>
            <Text
              ml="5px"
              mr="5px"
              fontSize={fontSize}
              fontWeight="semibold"
              _hover={{ color: "orange.400" }}
              color={
                location.pathname.startsWith("/seller/customer/service")
                  ? "orange.400"
                  : "white.500"
              }
              whiteSpace="nowrap"
            >
              Customer Service
            </Text>
          </Link>
          {location.pathname.startsWith("/seller/customer/service") ? (
            <IoIosArrowDown
              color={
                location.pathname.startsWith("/seller/customer/service")
                  ? "orange"
                  : "white"
              }
            />
          ) : (
            <IoIosArrowUp />
          )}
        </Box>
        {isCustomerServicePage && (
          <>
            <Box ml="25px">
              <Link to={`/seller/customer/service/review/${storeId}`}>
                <Text
                  fontSize={fontSize}
                  mb="3px"
                  mt="3px"
                  color={
                    location.pathname ===
                    `/seller/customer/service/review/${storeId}`
                      ? "orange.400"
                      : "white.500"
                  }
                  cursor="pointer"
                  whiteSpace="nowrap"
                >
                  Review Management
                </Text>
              </Link>
            </Box>
          </>
        )}
      </Box>

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
              location.pathname.startsWith("/seller/shop") ? "orange" : "gray"
            }
          />
          <Link to="/seller/shop/info">
            <Text
              ml="5px"
              mr="5px"
              fontSize={fontSize}
              fontWeight="semibold"
              _hover={{ color: "orange.400" }}
              color={
                location.pathname.startsWith("/seller/shop")
                  ? "orange.400"
                  : "white.500"
              }
            >
              Shop
            </Text>
          </Link>
          {location.pathname.startsWith("/seller/shop") ? (
            <IoIosArrowDown
              color={
                location.pathname.startsWith("/seller/shop")
                  ? "orange"
                  : "white"
              }
            />
          ) : (
            <IoIosArrowUp />
          )}
        </Box>
        {isShopPage && (
          <>
            <Box ml="25px">
              <Link to="/seller/shop/info">
                <Text
                  fontSize={fontSize}
                  mb="3px"
                  mt="3px"
                  color={
                    location.pathname === "/seller/shop/info"
                      ? "orange.400"
                      : "white.500"
                  }
                  cursor="pointer"
                  whiteSpace="nowrap"
                >
                  Shop Profile
                </Text>
              </Link>
              {!storeId && (
                <Link to="/seller/store/create">
                  <Text
                    fontSize={fontSize}
                    mb="3px"
                    mt="3px"
                    color={
                      location.pathname === "/seller/store/create"
                        ? "orange.400"
                        : "white.500"
                    }
                    cursor="pointer"
                    whiteSpace="nowrap"
                  >
                    Create Shop
                  </Text>
                </Link>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
