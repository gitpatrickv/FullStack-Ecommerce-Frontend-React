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
import { MdStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Inventory from "../../entities/Inventory";
import Product from "../../entities/Product";
import useAddToCart from "../../hooks/user/useAddToCart";
import useAddToCartVariation from "../../hooks/user/useAddToCartVariation";
import useAddToFavorites from "../../hooks/user/useAddToFavorites";
import useCartTotal from "../../hooks/user/useCartTotal";
import useCarts from "../../hooks/user/useCarts";
import useGetFavoritesStatus from "../../hooks/user/useGetFavoritesStatus";
import useGetUser from "../../hooks/user/useGetUser";
import { useAuthQueryStore } from "../../store/auth-store";
import useProductQueryStore from "../../store/product-store";
import { formatCurrency } from "../../utilities/formatCurrency";
import ProductImages from "./ProductImages";
import Review from "../Review/Review";
import useGetProductRatingAvg from "../../hooks/user/useGetProductRatingAvg";
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
  const { data: rating } = useGetProductRatingAvg(product.productId);
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
                    <Text mr="5px">{rating?.ratingAverage || 0}</Text>
                    <Box as={MdStar} color="orange.400" mr="10px" />
                    <Text mr="10px" color="gray.600">
                      |
                    </Text>
                    <Text mr="10px">
                      {rating?.totalNumberOfUserRating || 0}{" "}
                      <Text as="span" color="gray.600">
                        ratings
                      </Text>
                    </Text>
                    <Text mr="10px" color="gray.600">
                      |
                    </Text>
                    <Text>
                      {product.productSold}{" "}
                      <Text as="span" color="gray.600">
                        Sold
                      </Text>
                    </Text>
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
                                  : "gray.200"
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
                          color="gray.600"
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
                                  : "gray.200"
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
                      cursor="pointer"
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
          <Box mt="15px">
            <Card>
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
                <Review />
              </CardBody>
            </Card>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default ProductDetail;
