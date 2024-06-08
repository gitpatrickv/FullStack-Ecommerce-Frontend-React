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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Product from "../../entities/Product";
import useAddToCart from "../../hooks/useAddToCart";
import useAddToFavorites from "../../hooks/useAddToFavorites";
import useCartTotal from "../../hooks/useCartTotal";
import useCarts from "../../hooks/useCarts";
import useGetFavoritesStatus from "../../hooks/useGetFavoritesStatus";
import useGetUser from "../../hooks/useGetUser";
import { useAuthQueryStore } from "../../store/auth-store";
import useProductQueryStore from "../../store/product-store";
import { formatCurrency } from "../../utilities/formatCurrency";
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

  const toast = useToast();
  const { refetch: refetchTotal } = useCartTotal(jwtToken);
  const { refetch: refetchCarts } = useCarts(jwtToken);
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToFavorites } = useAddToFavorites();
  const { data: user } = useGetUser(jwtToken);
  const { data: status } = useGetFavoritesStatus(product.productId);
  const [addToFavorite, setAddToFavorite] = useState<boolean>(
    status?.favorites || false
  );
  const navigate = useNavigate();

  useEffect(() => {
    setAddToFavorite(status?.favorites || false);
  }, [status?.favorites]);

  const handleAddToCartClick = async () => {
    if (user) {
      try {
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
        toast({
          position: "top",
          title: "Item has been added to your cart",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          position: "top",
          title: "Error",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
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
              <Text
                fontSize="xl"
                fontWeight="semibold"
                lineHeight="short"
                textTransform="uppercase"
              >
                {product.storeName}
              </Text>
              <Text
                fontSize="xl"
                fontWeight="semibold"
                lineHeight="short"
                textTransform="capitalize"
              >
                {product.productName}
              </Text>
              <Text>{formatCurrency(product.price)}</Text>
              <Box position="relative" bottom="-100px">
                <HStack mt="4">
                  <Text>Quantity</Text>
                  <Button
                    onClick={() => decrement(product.quantity)}
                    _hover={{ color: "orange.400" }}
                  >
                    -
                  </Button>
                  <Text>{count}</Text>
                  <Button
                    onClick={() => increment(product.quantity)}
                    _hover={{ color: "orange.400" }}
                  >
                    +
                  </Button>
                  <Text color="gray.500">
                    {product.quantity} pieces available
                  </Text>
                </HStack>
                <Box display="flex" alignItems="center">
                  <Button
                    mt="4"
                    onClick={handleAddToCartClick}
                    mr="60px"
                    _hover={{ color: "orange.400" }}
                  >
                    Add to Cart
                  </Button>
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
              </Box>
            </VStack>
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
};

export default ProductDetail;
