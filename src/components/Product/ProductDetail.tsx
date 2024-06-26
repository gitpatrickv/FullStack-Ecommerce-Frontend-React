import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Inventory from "../../entities/Inventory";
import Product from "../../entities/Product";
import useAddToCart from "../../hooks/user/useAddToCart";
import useAddToFavorites from "../../hooks/user/useAddToFavorites";
import useCartTotal from "../../hooks/user/useCartTotal";
import useCarts from "../../hooks/user/useCarts";
import useGetFavoritesStatus from "../../hooks/user/useGetFavoritesStatus";
import useGetUser from "../../hooks/user/useGetUser";
import { useAuthQueryStore } from "../../store/auth-store";
import useProductQueryStore from "../../store/product-store";
import { formatCurrency } from "../../utilities/formatCurrency";
import useAddToCartVariation from "../../hooks/user/useAddToCartVariation";
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
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
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
    <Center>
      <Box m="5" p="5">
        <HStack>
          <Box p="5" w={[400, 500, 600]}>
            {product?.productImage.map((image, index) => (
              <Image key={index} src={image} h={[200, 300]} />
            ))}
          </Box>
          <Flex alignSelf="start">
            <VStack alignItems="start" m="4">
              <Box display="flex">
                <Text
                  fontSize="xl"
                  fontWeight="semibold"
                  lineHeight="short"
                  textTransform="uppercase"
                  mr="20px"
                >
                  {product.storeName}
                </Text>
                <Box
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  _hover={{ color: "orange.400" }}
                  onClick={() => handleNavigateStorePageClick(product.storeId)}
                >
                  <FaStore size="20px" />
                  <Text pl="5px" fontSize="medium">
                    View Store
                  </Text>
                </Box>
              </Box>
              <Text
                fontSize="xl"
                fontWeight="semibold"
                lineHeight="short"
                textTransform="capitalize"
              >
                {product.productName}
              </Text>
              {filteredInventory ? (
                <Text>{formatCurrency(filteredInventory?.price || 0)}</Text>
              ) : (
                <Text>{formatCurrency(product.inventoryModels[0].price)}</Text>
              )}

              {hasColorsOrSizes && (
                <>
                  <HStack>
                    {Array.from(
                      new Set(product.inventoryModels.map((inv) => inv.colors))
                    ).map((color) => (
                      <Button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        variant={selectedColor === color ? "solid" : "outline"}
                        color={
                          selectedColor === color ? "orange.400" : "gray.500"
                        }
                        textTransform="capitalize"
                      >
                        {color}
                      </Button>
                    ))}
                  </HStack>
                  <HStack>
                    {Array.from(
                      new Set(product.inventoryModels.map((inv) => inv.sizes))
                    ).map((size) => (
                      <Button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        variant={selectedSize === size ? "solid" : "outline"}
                        color={
                          selectedSize === size ? "orange.400" : "gray.500"
                        }
                        textTransform="capitalize"
                      >
                        {size}
                      </Button>
                    ))}
                  </HStack>
                </>
              )}

              <Box>
                <HStack mt="4">
                  <Text>Quantity</Text>
                  <Button
                    onClick={() => decrement(filteredInventory?.quantity || 0)}
                    _hover={{ color: "orange.400" }}
                  >
                    -
                  </Button>
                  {filteredInventory?.quantity === 0 ? (
                    <Text>0</Text>
                  ) : (
                    <Text>{count}</Text>
                  )}

                  <Button
                    onClick={() => increment(filteredInventory?.quantity || 0)}
                    _hover={{ color: "orange.400" }}
                  >
                    +
                  </Button>
                  {filteredInventory?.quantity === 0 ? (
                    <Text color="red">Out Of Stock</Text>
                  ) : (
                    <>
                      {filteredInventory ? (
                        <Text color="gray.500">
                          {filteredInventory?.quantity} pieces available
                        </Text>
                      ) : (
                        <Text color="gray.500">
                          {product.inventoryModels[0].quantity} pieces available
                        </Text>
                      )}
                    </>
                  )}
                </HStack>
              </Box>
              <Box display="flex" alignItems="center">
                {filteredInventory?.quantity === 0 ? (
                  <Button
                    mt="4"
                    mr="60px"
                    _hover={{ color: "orange.400" }}
                    isDisabled={true}
                  >
                    Add to Cart
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
                        Add to Cart
                      </Button>
                    ) : (
                      <Button
                        mt="4"
                        onClick={handleAddToCartClick}
                        mr="60px"
                        _hover={{ color: "orange.400" }}
                      >
                        Add to Cart
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
                      <Text pl="10px" fontSize="lg" fontWeight="semibold">
                        Add to Favorites
                      </Text>
                    </>
                  ) : (
                    ""
                  )}
                </Box>
              </Box>
            </VStack>
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
};

export default ProductDetail;
