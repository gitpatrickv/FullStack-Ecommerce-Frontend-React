import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  CloseButton,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/user/useLogin";

const LoginPage = () => {
  const { register, handleSubmit, loading, onSubmit, errors } = useLogin();

  return (
    <Box>
      <Center>
        <Stack spacing="5">
          <VStack as="header" mt="8">
            <Heading>
              {loading ? <Text>Logging In...</Text> : <Text>Log In</Text>}
            </Heading>
          </VStack>
          <Card
            variant="outline"
            borderColor="gray"
            w="400px"
            borderRadius="none"
          >
            <Box alignSelf="flex-end">
              <Link to="/">
                <CloseButton />
              </Link>
            </Box>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel color="white.500">Email</FormLabel>
                    <Input
                      disabled={loading}
                      {...register("email", { required: "Email is required" })}
                      type="text"
                      placeholder="Username or Email"
                      borderColor="gray"
                    />
                    {errors.email && (
                      <Text color="red"> {errors.email.message} </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel color="white.500">Password</FormLabel>
                    <Input
                      disabled={loading}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      type="password"
                      placeholder="Password"
                      borderColor="gray"
                    />
                    {errors.password && (
                      <Text color="red"> {errors.password.message} </Text>
                    )}
                  </FormControl>
                  <Button
                    isLoading={loading}
                    type="submit"
                    bg="orange.400"
                    _hover={{ bg: "orange.500" }}
                    _active={{ bg: "orange.600" }}
                  >
                    LOG IN
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>

          <Card
            variant="outline"
            borderColor="gray"
            w="400px"
            borderRadius="none"
          >
            <CardBody>
              <HStack>
                <Text>New User? </Text>
                <Link to="/register">
                  <Text
                    color="orange.400"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Create an account.
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

export default LoginPage;
