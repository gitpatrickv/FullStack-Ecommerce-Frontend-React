import { Box, Image, Text } from "@chakra-ui/react";
import LoginPage from "./LoginPage";

const SellerLoginPage = () => {
  return (
    <Box display="flex" justifyContent="space-evenly" alignItems="center">
      <Box>
        <Text fontSize="xx-large" fontWeight="semibold" color="orange.500">
          Be a Power Seller
        </Text>
        <Text>manage your shop efficiently on Shopee with our</Text>
        <Text>Shopee Seller Centre</Text>
        <Image
          src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9019759f347a781f.png"
          width="500px"
        />
      </Box>
      <LoginPage />
    </Box>
  );
};

export default SellerLoginPage;
