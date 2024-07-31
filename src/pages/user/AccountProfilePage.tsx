import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useGetUser from "../../hooks/user/useGetUser";
import useUpdateAccountInfo, {
  UpdateAccountProps,
} from "../../hooks/user/useUpdateAccountInfo";
import useUploadUserPhoto from "../../hooks/user/useUploadUserPhoto";
import { useAuthQueryStore } from "../../store/auth-store";

const AccountProfilePage = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: user } = useGetUser(jwtToken);
  const { onSubmit, loading } = useUpdateAccountInfo();
  const uploadPhoto = useUploadUserPhoto();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateAccountProps>({
    defaultValues: {
      name: user?.name,
      address: user?.address,
      contactNumber: user?.contactNumber,
    },
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("address", user.address);
      setValue("contactNumber", user.contactNumber);
    }
  }, [user, setValue]);

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadPhoto.mutate({ jwtToken: jwtToken, file: file });
    }
  };

  return (
    <Grid
      templateRows="0.3fr 1fr"
      templateColumns="1fr 1fr "
      templateAreas={`
      "header header "
    "content2 content3 "
  `}
      gap={5}
      p={5}
    >
      <GridItem area="header">
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Text fontSize="xl" fontWeight="semibold">
            My Profile
          </Text>
          <Text fontSize="md">Manage and protect your account</Text>
          <Divider pt="15px" />
        </Box>
      </GridItem>
      <GridItem area="content2" pt="20px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box ml="30px">
            <Box display="flex" alignItems="center" mb="20px">
              <Text mr="65px" fontSize="lg" fontWeight="semibold">
                Email
              </Text>
              <Text fontSize="lg">{user?.email}</Text>
            </Box>
            <FormControl pb="20px">
              <Box display="flex">
                <FormLabel mt="10px">Name</FormLabel>
                <Box display="flex" flexDirection="column" ml="50px">
                  <Input
                    disabled={loading}
                    {...register("name", {
                      required: "Name is required",
                    })}
                    type="text"
                    borderColor="gray.500"
                    width="600px"
                  />
                  {errors.name && (
                    <Text color="red">{errors.name.message}</Text>
                  )}
                </Box>
              </Box>
            </FormControl>

            <FormControl pb="20px">
              <Box display="flex">
                <FormLabel mt="10px">Address</FormLabel>
                <Box display="flex" flexDirection="column" ml="35px">
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
                <FormLabel mt="10px" whiteSpace="nowrap">
                  Contact No.
                </FormLabel>
                <Box display="flex" flexDirection="column" ml="8px">
                  <Input
                    disabled={loading}
                    {...register("contactNumber", {
                      required: "Phone number is required",
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

            <Button
              isLoading={loading}
              type="submit"
              bg="orange.500"
              _hover={{ bg: "orange.600" }}
              width="120px"
              ml="107px"
            >
              Save
            </Button>
          </Box>
        </form>
      </GridItem>
      <GridItem area="content3" pt="20px" ml="30px">
        <Box display="flex" justifyContent="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={
                user?.photoUrl
                  ? user?.photoUrl
                  : "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
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
  );
};

export default AccountProfilePage;
