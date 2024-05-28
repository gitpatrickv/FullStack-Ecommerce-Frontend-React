import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  GridItem,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import useGetUser from "../hooks/useGetUser";
import useUpdateAccountInfo from "../hooks/useUpdateAccountInfo";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface UpdateAccountProps {
  name: string;
  address: string;
  contactNumber: string;
}

const AccountProfilePage = () => {
  const jwtToken = localStorage.getItem("jwtToken");
  const { data: user } = useGetUser(jwtToken || "");
  const { register, handleSubmit, setValue } = useForm<UpdateAccountProps>({
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

  const { onSubmit, loading } = useUpdateAccountInfo();

  return (
    <Grid
      templateRows="0.3fr 1fr"
      templateColumns=" 0.5fr 1fr 1fr "
      templateAreas={`
      "header header header "
    "content1 content2 content3 "
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

      <GridItem area="content1" pt="20px">
        <Box>
          <Box textAlign="end">
            <Text fontSize="large" mb="27px" fontWeight="semibold">
              Email
            </Text>
            <Text fontSize="large" mb="34px" fontWeight="semibold">
              Name
            </Text>
            <Text fontSize="large" mb="32px" fontWeight="semibold">
              Address
            </Text>
            <Text fontSize="large" fontWeight="semibold">
              Phone Number
            </Text>
          </Box>
        </Box>
      </GridItem>
      <GridItem area="content2" pt="20px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box textAlign="start">
            <Text fontSize="large" mb="20px">
              {user?.email}
            </Text>
            <FormControl pb="20px">
              <Input
                disabled={loading}
                {...register("name")}
                type="text"
                borderColor="gray.500"
              />
            </FormControl>
            <FormControl pb="20px">
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

            <Button
              isLoading={loading}
              type="submit"
              _hover={{ color: "orange.400" }}
            >
              Save
            </Button>
          </Box>
        </form>
      </GridItem>
      <GridItem area="content3" pt="20px">
        <Box display="flex" justifyContent="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <FaRegUser size="100px" />
            <Button mt="20px">Select Image</Button>
            <Text mt="10px">File size: maximum 1 MB</Text>
            <Text>File extension: .JPEG, .PNG</Text>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default AccountProfilePage;
