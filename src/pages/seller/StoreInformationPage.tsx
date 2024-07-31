import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useGetStoreInfo from "../../hooks/seller/useGetStoreInfo";
import useUpdateShopInfo, {
  UpdateShopProps,
} from "../../hooks/seller/useUpdateShopInfo";
import useUploadStorePhoto from "../../hooks/seller/useUploadStorePhoto";
import { useAuthQueryStore } from "../../store/auth-store";

const StoreInformationPage = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: shop } = useGetStoreInfo(jwtToken);
  const { onSubmit, loading } = useUpdateShopInfo(shop?.storeId || "");
  const uploadPhoto = useUploadStorePhoto(shop?.storeId || "");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateShopProps>({
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
    <Card borderRadius="none">
      <Grid
        templateRows="0.3fr 0.7fr"
        templateColumns="0.6fr 0.4fr "
        templateAreas={`
  "header header "
"content2 content3 "
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
        <GridItem area="content2" mt="10px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box ml="30px">
              <FormControl pb="20px">
                <Box display="flex">
                  <FormLabel mt="10px" whiteSpace="nowrap">
                    Store Name
                  </FormLabel>
                  <Box display="flex" flexDirection="column" ml="20px">
                    <Input
                      disabled={loading}
                      {...register("storeName", {
                        required: "Store name is required",
                      })}
                      type="text"
                      borderColor="gray.500"
                      width="600px"
                    />
                    {errors.storeName && (
                      <Text color="red"> {errors.storeName.message} </Text>
                    )}
                  </Box>
                </Box>
              </FormControl>
              <FormControl mb="20px">
                <Box display="flex">
                  <FormLabel mt="10px">Description</FormLabel>
                  <Box display="flex" flexDirection="column" ml="23px">
                    <Textarea
                      disabled={loading}
                      {...register("storeDescription", {
                        required: "Store description is required",
                      })}
                      borderColor="gray.500"
                      width="600px"
                    />
                    {errors.storeDescription && (
                      <Text color="red">{errors.storeDescription.message}</Text>
                    )}
                  </Box>
                </Box>
              </FormControl>
              <FormControl mb="20px">
                <Box display="flex">
                  <FormLabel mt="10px">Address</FormLabel>
                  <Box display="flex" flexDirection="column" ml="48px">
                    <Input
                      disabled={loading}
                      {...register("address", {
                        required: "Address is required",
                      })}
                      type="text"
                      borderColor="gray.500"
                      width="600px"
                    />
                    {errors.address && (
                      <Text color="red">{errors.address.message}</Text>
                    )}
                  </Box>
                </Box>
              </FormControl>

              <FormControl mb="20px">
                <Box display="flex">
                  <FormLabel mt="10px">Contact No.</FormLabel>
                  <Box display="flex" flexDirection="column" ml="19px">
                    <Input
                      disabled={loading}
                      {...register("contactNumber", {
                        required: "Contact number is required",
                      })}
                      type="text"
                      borderColor="gray.500"
                      width="600px"
                    />
                    {errors.contactNumber && (
                      <Text color="red">{errors.contactNumber.message}</Text>
                    )}
                  </Box>
                </Box>
              </FormControl>
              <FormControl mb="20px">
                <Box display="flex">
                  <FormLabel mt="10px">Shipping Fee</FormLabel>
                  <Box display="flex" flexDirection="column" ml="13px">
                    <Input
                      disabled={loading}
                      {...register("shippingFee", {
                        required: "Shipping fee is required",
                      })}
                      type="text"
                      borderColor="gray.500"
                      width="600px"
                    />
                    {errors.shippingFee && (
                      <Text color="red">{errors.shippingFee.message}</Text>
                    )}
                  </Box>
                </Box>
              </FormControl>

              <Button
                isLoading={loading}
                type="submit"
                bg="orange.500"
                _hover={{ bg: "orange.600" }}
                width="120px"
                ml="120px"
              >
                Save
              </Button>
            </Box>
          </form>
        </GridItem>
        <GridItem area="content3" mt="10px" ml="30px">
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
