import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  CloseButton,
  FormControl,
  HStack,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { User, schema } from "../../entities/User";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<User>("/user/register");

const RegisterationForm = () => {
  const [loading, isLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      isLoading(true);
      await apiClient.post(data);
      console.log("registration successful");
      reset();
    } catch (error) {
      console.log("registration failed");
    } finally {
      isLoading(false);
    }
  };

  return (
    <Box>
      <Center>
        <Stack spacing="5">
          <VStack as="header" spacing="6" mt="8">
            <Heading>Register</Heading>
          </VStack>
          <Card variant="outline" borderColor="gray" maxW="400px">
            <Box alignSelf="flex-end">
              <Link to="/">
                <CloseButton />
              </Link>
            </Box>
            <CardBody>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit(onSubmit)(event);
                }}
              >
                <Stack spacing={3}>
                  <Input
                    disabled={loading}
                    {...register("email")}
                    type="text"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <Text color="red">{errors.email.message}</Text>
                  )}
                  <Input
                    disabled={loading}
                    {...register("name")}
                    type="text"
                    placeholder="Name"
                  />
                  <Input
                    disabled={loading}
                    {...register("address")}
                    type="text"
                    placeholder="Address"
                  />
                  <Input
                    disabled={loading}
                    {...register("contactNumber")}
                    type="text"
                    placeholder="Contact Number"
                  />
                  <Input
                    disabled={loading}
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                  />
                  <Input
                    disabled={loading}
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <FormControl>
                    <Select
                      {...register("role")}
                      id="role"
                      defaultValue=""
                      disabled={loading}
                    >
                      <option value="USER">User</option>
                      <option value="SELLER">Seller</option>
                    </Select>
                  </FormControl>
                  <Button
                    isLoading={loading}
                    type="submit"
                    bg="blue.400"
                    _hover={{ bg: "blue.500" }}
                    _active={{ bg: "blue.600" }}
                  >
                    Register
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>
          <Card variant="outline" borderColor="gray" maxW="400px">
            <CardBody>
              <HStack>
                <Text>Already have an account? </Text>
                <Link to="/login">
                  <Text
                    color="blue.400"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Log in.
                  </Text>
                </Link>
              </HStack>
            </CardBody>
          </Card>
        </Stack>
      </Center>
    </Box>
  );
};

export default RegisterationForm;
