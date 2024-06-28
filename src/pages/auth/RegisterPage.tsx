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
import { Link } from "react-router-dom";
import useRegisterUser from "../../hooks/user/useRegisterUser";

const RegisterPage = () => {
  const { register, handleSubmit, loading, onSubmit, errors } =
    useRegisterUser();

  return (
    <Box>
      <Center>
        <Stack spacing="5">
          <VStack as="header" spacing="6" mt="8">
            <Heading>Register</Heading>
          </VStack>
          <Card variant="outline" borderColor="gray" w="500px">
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
                    {...register("email", { required: true })}
                    type="text"
                    placeholder="Email"
                    disabled={loading}
                  />
                  {errors.email && (
                    <Text color="red">{errors.email.message}</Text>
                  )}

                  <Input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Name"
                    disabled={loading}
                  />
                  {errors.name && (
                    <Text color="red">{errors.name.message}</Text>
                  )}

                  <Input
                    {...register("address", { required: true })}
                    type="text"
                    placeholder="Address"
                    disabled={loading}
                  />
                  {errors.address && (
                    <Text color="red">{errors.address.message}</Text>
                  )}

                  <Input
                    {...register("contactNumber", { required: true })}
                    type="text"
                    placeholder="Contact Number"
                    disabled={loading}
                  />
                  {errors.contactNumber && (
                    <Text color="red">{errors.contactNumber.message}</Text>
                  )}

                  <Input
                    {...register("password", { required: true })}
                    type="password"
                    placeholder="Password"
                    disabled={loading}
                  />
                  {errors.password && (
                    <Text color="red">{errors.password.message}</Text>
                  )}

                  <Input
                    {...register("confirmPassword", { required: true })}
                    type="password"
                    placeholder="Confirm Password"
                    disabled={loading}
                  />
                  {errors.confirmPassword && (
                    <Text color="red">{errors.confirmPassword.message}</Text>
                  )}
                  <FormControl>
                    <Select
                      {...register("role", { required: true })}
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
                    bg="orange.400"
                    _hover={{ bg: "orange.500" }}
                    _active={{ bg: "orange.600" }}
                  >
                    Register
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>
          <Card variant="outline" borderColor="gray" w="500px">
            <CardBody>
              <HStack>
                <Text>Already have an account? </Text>
                <Link to="/login">
                  <Text
                    color="orange.400"
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

export default RegisterPage;
