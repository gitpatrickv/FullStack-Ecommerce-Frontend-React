import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaStore } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Inventory from "../../entities/Inventory";
import Product from "../../entities/Product";
import useAddToCart from "../../hooks/user/useAddToCart";
import useAddToCartVariation from "../../hooks/user/useAddToCartVariation";
import useAddToFavorites from "../../hooks/user/useAddToFavorites";
import useCartTotal from "../../hooks/user/useCartTotal";
import useCarts from "../../hooks/user/useCarts";
import useGetFavoritesStatus from "../../hooks/user/useGetFavoritesStatus";
import useGetTotalUserRating from "../../hooks/user/useGetTotalUserRating";
import useGetUser from "../../hooks/user/useGetUser";
import { useAuthQueryStore } from "../../store/auth-store";
import useProductQueryStore from "../../store/product-store";
import { formatCurrency } from "../../utilities/formatCurrency";
import AllStarRating from "./AllStarRating";
import FromTheSameStore from "./FromTheSameStore";
import ProductImages from "./ProductImages";
import Star1Rating from "./Star1Rating";
import Star2Rating from "./Star2Rating";
import Star3Rating from "./Star3Rating";
import Star4Rating from "./Star4Rating";
import Star5Rating from "./Star5Rating";
interface Props {
  product: Product;
}

const ProductDetail = ({ product }: Props) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { count, increment, decrement, reset } = useProductQueryStore(
    (state) => ({
      count: state.productQuery.count,
      increment: state.increment,
      decrement: state.decrement,
      reset: state.reset,
    })
  );
  const ratings = [1, 2, 3, 4, 5];
  const { data: userRating } = useGetTotalUserRating(product.productId);

  const ratingAvg = userRating?.ratingAverage ?? 0;
  const { refetch: refetchTotal } = useCartTotal(jwtToken);
  const { refetch: refetchCarts } = useCarts(jwtToken);
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToCartWithVariations } = useAddToCartVariation();
  const { mutate: addToFavorites } = useAddToFavorites();
  const { data: user } = useGetUser(jwtToken);
  const { data: status } = useGetFavoritesStatus(product.productId);
  const [addToFavorite, setAddToFavorite] = useState<boolean>(
    status?.favorites || false
  );
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState<string>(
    product.inventoryModels.length > 0 ? product.inventoryModels[0].colors : ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.inventoryModels.length > 0 ? product.inventoryModels[0].sizes : ""
  );
  const [filteredInventory, setFilteredInventory] = useState<Inventory | null>(
    null
  );

  useEffect(() => {
    setAddToFavorite(status?.favorites || false);
  }, [status?.favorites]);

  useEffect(() => {
    filterInventory(selectedColor, selectedSize);
  }, [selectedColor, selectedSize]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    reset();
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    reset();
  };

  const filterInventory = (color: string, size: string) => {
    const inventory = product.inventoryModels.find(
      (inv) => inv.colors === color && inv.sizes === size
    );
    setFilteredInventory(inventory || null);
  };

  const hasColorsOrSizes = product.inventoryModels.some(
    (inv) => !!inv.colors || !!inv.sizes
  );

  const getAvailableColors = (size: string) => {
    const uniqueColors = new Set<string>();
    product.inventoryModels.forEach((inv) => {
      if (inv.sizes === size && inv.quantity > 0) {
        uniqueColors.add(inv.colors);
      }
    });
    return Array.from(uniqueColors);
  };

  const getAvailableSizes = (color: string) => {
    const uniqueSizes = new Set<string>();
    product.inventoryModels.forEach((inv) => {
      if (inv.colors === color && inv.quantity > 0) {
        uniqueSizes.add(inv.sizes);
      }
    });
    return Array.from(uniqueSizes);
  };

  const availableColors = getAvailableColors(selectedSize);
  const availableSizes = getAvailableSizes(selectedColor);

  const handleAddToCartClick = async () => {
    if (user) {
      await addToCart(
        {
          productId: product.productId,
          quantity: count,
          jwtToken: jwtToken,
        },
        {
          onSuccess: () => {
            refetchCarts();
            refetchTotal();
          },
        }
      );
      reset();
    } else {
      navigate("/login");
    }
  };

  const handleAddToCartVariationClick = async () => {
    if (user) {
      await addToCartWithVariations(
        {
          productId: product.productId,
          quantity: count,
          colors: selectedColor,
          sizes: selectedSize,
          jwtToken: jwtToken,
        },
        {
          onSuccess: () => {
            refetchCarts();
            refetchTotal();
          },
        }
      );
      reset();
    } else {
      navigate("/login");
    }
  };

  const handleAddToFavoritesClick = () => {
    addToFavorites(product.productId, {
      onSuccess: () => {
        setAddToFavorite(!addToFavorite);
      },
    });
  };

  const handleNavigateStorePageClick = (storeId: string) => {
    navigate(`/store/` + storeId);
  };

  const [selectedRating, setSelectedRating] = useState<string | null>("All");

  const handleSelectedRatingClick = (rating: string) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };

  return (
    <>
      <Card>
        <CardBody>
          <Grid
            templateColumns="0.6fr 600px "
            templateAreas={`
      "content1 content2"
    `}
          >
            <GridItem area="content1">
              <Box p={5} w={[600, 500, 700]}>
                <ProductImages productImage={product.productImage} />
              </Box>
            </GridItem>

            <GridItem area="content2">
              <Box p={3}>
                <Box>
                  <Text
                    fontSize="x-large"
                    fontWeight="semibold"
                    textTransform="capitalize"
                    mb="5px"
                    mr="20px"
                  >
                    {product.productName}
                  </Text>
                  <Box display="flex" alignItems="center">
                    {userRating?.ratingAverage === 0 ||
                    userRating?.overallTotalUserRating === 0 ? (
                      <Box>
                        <Text mr="10px">No Ratings Yet</Text>
                      </Box>
                    ) : (
                      <>
                        <Text
                          mr="5px"
                          color="orange.400"
                          textDecoration="underline 1px"
                          style={{ textUnderlineOffset: "5px" }}
                          fontWeight="semibold"
                        >
                          {userRating?.ratingAverage || 0}
                        </Text>
                        {ratings.map((rate) => (
                          <Box
                            as={IoIosStar}
                            color={
                              rate <= ratingAvg ? "orange.400" : "gray.600"
                            }
                            key={rate}
                          />
                        ))}
                        <Text ml="10px" mr="10px" color="gray.600">
                          |
                        </Text>
                        <Text
                          mr="5px"
                          textDecoration="underline 1px"
                          style={{ textUnderlineOffset: "5px" }}
                          fontWeight="semibold"
                        >
                          {userRating?.overallTotalUserRating || 0}
                        </Text>
                        <Text color="gray.600" mr="10px">
                          Ratings
                        </Text>
                      </>
                    )}

                    <Text mr="10px" color="gray.600">
                      |
                    </Text>
                    <Text
                      textDecoration="underline 1px"
                      style={{ textUnderlineOffset: "5px" }}
                      mr="5px"
                      fontWeight="semibold"
                    >
                      {product.productSold}
                    </Text>
                    <Text color="gray.600">Sold</Text>
                  </Box>
                  <Box mb="15px" mt="5px">
                    {filteredInventory ? (
                      <Text
                        fontSize="xx-large"
                        fontWeight="semibold"
                        textTransform="capitalize"
                        color="orange.400"
                      >
                        {formatCurrency(filteredInventory?.price || 0)}
                      </Text>
                    ) : (
                      <Text
                        fontSize="xx-large"
                        fontWeight="semibold"
                        textTransform="capitalize"
                        color="orange.400"
                      >
                        {formatCurrency(product.inventoryModels[0].price)}
                      </Text>
                    )}
                  </Box>
                  {!hasColorsOrSizes && <Box mb="180px"></Box>}

                  {hasColorsOrSizes && (
                    <>
                      <HStack mb="15px">
                        <Text
                          mr="17px"
                          fontSize="xl"
                          color="gray.600"
                          mb="10px"
                        >
                          Variants
                        </Text>
                        <Flex flexWrap="wrap">
                          {Array.from(
                            new Set(
                              product.inventoryModels.map((inv) => inv.colors)
                            )
                          ).map((color) => (
                            <Button
                              key={color}
                              w="100px"
                              fontSize="md"
                              onClick={() => handleColorChange(color)}
                              variant={
                                selectedColor === color ? "solid" : "outline"
                              }
                              color={
                                selectedColor === color
                                  ? "orange.400"
                                  : "white.500"
                              }
                              textTransform="capitalize"
                              isDisabled={!availableColors.includes(color)}
                              mb="10px"
                              mr="5px"
                            >
                              {color}
                            </Button>
                          ))}
                        </Flex>
                      </HStack>
                      <HStack mb="15px">
                        <Text
                          mr="52px"
                          fontSize="xl"
                          color="gray.500"
                          mb="10px"
                        >
                          Size
                        </Text>
                        <Flex flexWrap="wrap">
                          {Array.from(
                            new Set(
                              product.inventoryModels.map((inv) => inv.sizes)
                            )
                          ).map((size) => (
                            <Button
                              key={size}
                              w="100px"
                              fontSize="md"
                              onClick={() => handleSizeChange(size)}
                              variant={
                                selectedSize === size ? "solid" : "outline"
                              }
                              color={
                                selectedSize === size
                                  ? "orange.400"
                                  : "white.500"
                              }
                              textTransform="capitalize"
                              isDisabled={!availableSizes.includes(size)}
                              mb="10px"
                              mr="5px"
                            >
                              {size}
                            </Button>
                          ))}
                        </Flex>
                      </HStack>
                    </>
                  )}
                  <Box mb="10px" display="flex">
                    <Text mr="20px" fontSize="xl" color="gray.600" mt="5px">
                      Quantity
                    </Text>
                    <Box
                      width="40px"
                      height="40px"
                      border="1px solid"
                      borderColor="gray.600"
                      textAlign="center"
                      cursor="pointer"
                      onClick={() =>
                        decrement(filteredInventory?.quantity || 0)
                      }
                      _hover={{ color: "orange.400" }}
                      userSelect="none"
                    >
                      <Text fontSize="x-large" position="relative" bottom="2px">
                        -
                      </Text>
                    </Box>

                    {filteredInventory?.quantity === 0 ? (
                      <Box
                        width="70px"
                        height="40px"
                        border="1px solid "
                        borderColor="gray.600"
                        textAlign="center"
                      >
                        <Text mt="5px" fontSize="lg" fontWeight="semibold">
                          0
                        </Text>
                      </Box>
                    ) : (
                      <Box
                        width="70px"
                        height="40px"
                        border="1px solid "
                        borderColor="gray.600"
                        textAlign="center"
                      >
                        <Text mt="5px" fontSize="lg" fontWeight="semibold">
                          {count}
                        </Text>
                      </Box>
                    )}

                    <Box
                      width="40px"
                      height="40px"
                      border="1px solid"
                      borderColor="gray.600"
                      textAlign="center"
                      cursor={
                        count === filteredInventory?.quantity
                          ? "not-allowed"
                          : "pointer"
                      }
                      onClick={() =>
                        increment(filteredInventory?.quantity || 0)
                      }
                      _hover={{ color: "orange.400" }}
                      userSelect="none"
                    >
                      <Text fontSize="x-large" position="relative" bottom="2px">
                        +
                      </Text>
                    </Box>
                    <Box mt="8px" ml="10px">
                      {filteredInventory?.quantity === 0 ? (
                        <Text color="red" fontSize="md">
                          Out Of Stock
                        </Text>
                      ) : (
                        <>
                          {filteredInventory ? (
                            <Text color="gray.600" fontSize="md">
                              {filteredInventory?.quantity} pieces available
                            </Text>
                          ) : (
                            <Text color="red" fontSize="md">
                              Not available
                            </Text>
                          )}
                        </>
                      )}
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center">
                    {filteredInventory?.quantity === 0 ? (
                      <Button
                        mt="4"
                        mr="60px"
                        _hover={{ color: "orange.400" }}
                        isDisabled={true}
                      >
                        <BsCartPlus size="20px" />
                        <Text pl="10px">Add To Cart</Text>
                      </Button>
                    ) : (
                      <>
                        {hasColorsOrSizes ? (
                          <Button
                            mt="4"
                            onClick={handleAddToCartVariationClick}
                            mr="60px"
                            _hover={{ color: "orange.400" }}
                          >
                            <BsCartPlus size="20px" />
                            <Text pl="10px">Add To Cart</Text>
                          </Button>
                        ) : (
                          <Button
                            mt="4"
                            onClick={handleAddToCartClick}
                            mr="60px"
                            _hover={{ color: "orange.400" }}
                          >
                            <BsCartPlus size="20px" />
                            <Text pl="10px">Add To Cart</Text>
                          </Button>
                        )}
                      </>
                    )}

                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      position="relative"
                      top="10px"
                    >
                      {user ? (
                        <>
                          <IconButton
                            aria-label="Search"
                            icon={
                              addToFavorite ? (
                                <FaHeart color="red" size="30px" />
                              ) : (
                                <FaRegHeart size="30px" />
                              )
                            }
                            type="button"
                            bg="transparent"
                            _hover={{ bg: "transparent" }}
                            onClick={handleAddToFavoritesClick}
                          />
                          <Text
                            pl="5px"
                            fontSize="lg"
                            fontWeight="semibold"
                            cursor="pointer"
                            onClick={handleAddToFavoritesClick}
                          >
                            Add To Favorites
                          </Text>
                        </>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
      <Grid
        templateColumns="1fr"
        templateAreas={`
      "content1 "
    `}
        mt="15px"
      >
        <GridItem area="content1">
          <Card>
            <CardBody>
              <Box display="flex">
                <Avatar
                  src={
                    "https://media.istockphoto.com/id/912819604/vector/storefront-flat-design-e-commerce-icon.jpg?s=612x612&w=0&k=20&c=_x_QQJKHw_B9Z2HcbA2d1FH1U1JVaErOAp2ywgmmoTI="
                  }
                  size="xl"
                />
                <Text
                  fontSize="x-large"
                  fontWeight="semibold"
                  textTransform="capitalize"
                  mr="20px"
                  ml="15px"
                  color="orange.400"
                >
                  {product.storeName}
                </Text>
                <Button
                  cursor="pointer"
                  display="flex"
                  _hover={{ color: "orange.400" }}
                  onClick={() => handleNavigateStorePageClick(product.storeId)}
                >
                  <FaStore size="20px" />
                  <Text pl="5px" fontSize="medium">
                    View Store
                  </Text>
                </Button>
              </Box>
            </CardBody>
          </Card>
          <Card mt="15px">
            <CardBody>
              <Text
                fontSize="x-large"
                fontWeight="semibold"
                textTransform="capitalize"
                mb="10px"
                color="orange.400"
              >
                Product Description
              </Text>
              <Text>{product.productDescription}</Text>
            </CardBody>
          </Card>

          <Card mt="15px">
            <CardBody>
              <Text
                fontSize="x-large"
                fontWeight="semibold"
                textTransform="capitalize"
                mb="10px"
                color="orange.400"
              >
                Product Ratings
              </Text>

              <Card>
                <CardBody>
                  <Box display="flex">
                    <Box
                      display="flex"
                      flexDirection="column"
                      mr="40px"
                      position="relative"
                      bottom="5px"
                    >
                      <Box display="flex" alignItems="center">
                        <Text color="orange.400" fontSize="x-large" mr="5px">
                          {userRating?.ratingAverage || 0}
                        </Text>
                        <Text color="orange.400" fontSize="large">
                          out of 5
                        </Text>
                      </Box>
                      {userRating?.ratingAverage === 0 ||
                      userRating?.overallTotalUserRating === 0 ? (
                        <Box>
                          <Text mr="10px">No Ratings Yet</Text>
                        </Box>
                      ) : (
                        <Box display="flex">
                          {ratings.map((rate) => (
                            <Box
                              as={IoIosStar}
                              color={
                                rate <= ratingAvg ? "orange.400" : "gray.600"
                              }
                              key={rate}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                    <Box position="relative" top="7px">
                      <Button
                        width="120px"
                        mr="10px"
                        value="All"
                        onClick={() => handleSelectedRatingClick("All")}
                        color={
                          selectedRating === "All" ? "orange.400" : "white.500"
                        }
                      >
                        All ({userRating?.overallTotalUserRating || 0})
                      </Button>
                      <Button
                        width="120px"
                        mr="10px"
                        value="5"
                        onClick={() => handleSelectedRatingClick("5")}
                        color={
                          selectedRating === "5" ? "orange.400" : "white.500"
                        }
                      >
                        5 Star ({userRating?.total5StarUserRating || 0})
                      </Button>
                      <Button
                        width="120px"
                        mr="10px"
                        value="4"
                        onClick={() => handleSelectedRatingClick("4")}
                        color={
                          selectedRating === "4" ? "orange.400" : "white.500"
                        }
                      >
                        4 Star ({userRating?.total4StarUserRating || 0})
                      </Button>
                      <Button
                        width="120px"
                        mr="10px"
                        value="3"
                        onClick={() => handleSelectedRatingClick("3")}
                        color={
                          selectedRating === "3" ? "orange.400" : "white.500"
                        }
                      >
                        3 Star ({userRating?.total3StarUserRating || 0})
                      </Button>
                      <Button
                        width="120px"
                        mr="10px"
                        value="2"
                        onClick={() => handleSelectedRatingClick("2")}
                        color={
                          selectedRating === "2" ? "orange.400" : "white.500"
                        }
                      >
                        2 Star ({userRating?.total2StarUserRating || 0})
                      </Button>
                      <Button
                        width="120px"
                        mr="10px"
                        value="1"
                        onClick={() => handleSelectedRatingClick("1")}
                        color={
                          selectedRating === "1" ? "orange.400" : "white.500"
                        }
                      >
                        1 Star ({userRating?.total1StarUserRating || 0})
                      </Button>
                    </Box>
                  </Box>
                  <Box>
                    {selectedRating === "All" && (
                      <AllStarRating productId={product.productId} />
                    )}
                    {selectedRating === "5" && (
                      <Star5Rating productId={product.productId} />
                    )}
                    {selectedRating === "4" && (
                      <Star4Rating productId={product.productId} />
                    )}
                    {selectedRating === "3" && (
                      <Star3Rating productId={product.productId} />
                    )}
                    {selectedRating === "2" && (
                      <Star2Rating productId={product.productId} />
                    )}
                    {selectedRating === "1" && (
                      <Star1Rating productId={product.productId} />
                    )}
                  </Box>
                </CardBody>
              </Card>
            </CardBody>
          </Card>

          <Box padding={5}>
            <Text
              fontWeight="semibold"
              fontSize="x-large"
              color="white.500"
              mb="5px"
              mt="10px"
            >
              FROM THE SAME SHOP
            </Text>
            <FromTheSameStore storeId={product.storeId} />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default ProductDetail;
