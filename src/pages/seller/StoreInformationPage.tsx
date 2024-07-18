import React, { useEffect } from "react";
import useGetStoreInfo from "../../hooks/seller/useGetStoreInfo";
import useUpdateShopInfo, {
  UpdateShopProps,
} from "../../hooks/seller/useUpdateShopInfo";
import { useAuthQueryStore } from "../../store/auth-store";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  Grid,
  GridItem,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import useUploadStorePhoto from "../../hooks/seller/useUploadStorePhoto";

const StoreInformationPage = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: shop } = useGetStoreInfo(jwtToken);
  const { onSubmit, loading } = useUpdateShopInfo(shop?.storeId || "");
  const uploadPhoto = useUploadStorePhoto(shop?.storeId || "");
  const { register, handleSubmit, setValue } = useForm<UpdateShopProps>({
    defaultValues: {
      storeName: shop?.storeName,
      storeDescription: shop?.storeDescription,
      address: shop?.address,
      contactNumber: shop?.contactNumber,
      shippingFee: shop?.shippingFee,
    },
  });

  useEffect(() => {
    if (shop) {
      setValue("storeName", shop.storeName);
      setValue("storeDescription", shop.storeDescription);
      setValue("address", shop.address);
      setValue("contactNumber", shop.contactNumber);
      setValue("shippingFee", shop.shippingFee);
    }
  }, [shop, setValue]);

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadPhoto.mutate({ jwtToken: jwtToken, file: file });
    }
  };

  return (
    <Card mt="30px" borderRadius="none">
      <Grid
        templateRows="0.3fr 0.7fr"
        templateColumns=" 0.2fr 0.4fr 0.4fr "
        templateAreas={`
  "header header header "
"content1 content2 content3 "
`}
        gap={5}
        p={5}
      >
        <GridItem area="header">
          <Box display="flex" flexDirection="column">
            <Text fontSize="xl" fontWeight="semibold">
              Shop Profile
            </Text>
            <Text fontSize="md">Update your shop profile</Text>
            <Divider pt="15px" />
          </Box>
        </GridItem>

        <GridItem area="content1" mt="10px">
          <Box mt="10px">
            <Box textAlign="end">
              <Text
                fontSize="large"
                mb="28px"
                fontWeight="semibold"
                whiteSpace="nowrap"
              >
                Store Name
              </Text>
              <Text
                fontSize="large"
                mb="78px"
                fontWeight="semibold"
                whiteSpace="nowrap"
              >
                Store Description
              </Text>
              <Text
                fontSize="large"
                mb="34px"
                fontWeight="semibold"
                whiteSpace="nowrap"
              >
                Address
              </Text>
              <Text
                fontSize="large"
                mb="30px"
                fontWeight="semibold"
                whiteSpace="nowrap"
              >
                Contact Number
              </Text>
              <Text fontSize="large" fontWeight="semibold" whiteSpace="nowrap">
                Shipping Fee
              </Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem area="content2" mt="10px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box textAlign="start">
              <FormControl pb="20px">
                <Input
                  disabled={loading}
                  {...register("storeName")}
                  type="text"
                  borderColor="gray.500"
                />
              </FormControl>
              <FormControl mb="20px">
                <Textarea
                  disabled={loading}
                  {...register("storeDescription")}
                  borderColor="gray.500"
                />
              </FormControl>
              <FormControl mb="20px">
                <Input
                  disabled={loading}
                  {...register("address")}
                  type="text"
                  borderColor="gray.500"
                />
              </FormControl>
              <FormControl mb="20px">
                <Input
                  disabled={loading}
                  {...register("contactNumber")}
                  type="text"
                  borderColor="gray.500"
                />
              </FormControl>
              <FormControl mb="20px">
                <Input
                  disabled={loading}
                  {...register("shippingFee")}
                  type="text"
                  borderColor="gray.500"
                />
              </FormControl>

              <Button
                isLoading={loading}
                type="submit"
                _hover={{ color: "orange.400" }}
                width="120px"
              >
                Save
              </Button>
            </Box>
          </form>
        </GridItem>
        <GridItem area="content3" mt="10px">
          <Box display="flex" justifyContent="center">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={
                  shop?.photoUrl ||
                  "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
                }
                size="2xl"
              />
              <input
                type="file"
                accept=".jpeg, .png"
                onChange={handleUploadImage}
                style={{ display: "none" }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button
                  as="span"
                  mt="20px"
                  cursor="pointer"
                  _hover={{ color: "orange.400" }}
                >
                  Select Image
                </Button>
              </label>
              <Text mt="10px" whiteSpace="nowrap">
                File size: maximum 1 MB
              </Text>
              <Text whiteSpace="nowrap">File extension: .JPEG, .PNG</Text>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default StoreInformationPage;
