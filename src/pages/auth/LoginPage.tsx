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
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/user/useLogin";
import { IoIosEye } from "react-icons/io";
import { RiEyeCloseLine } from "react-icons/ri";
import { useState } from "react";

const LoginPage = () => {
  const { register, handleSubmit, loading, onSubmit, errors } = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

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
                    <InputGroup>
                      <Input
                        disabled={loading}
                        {...register("password", {
                          required: "Password is required",
                        })}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        borderColor="gray"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label="show"
                          icon={
                            showPassword ? (
                              <IoIosEye size="25px" />
                            ) : (
                              <RiEyeCloseLine size="25px" />
                            )
                          }
                          onClick={handleShowPasswordClick}
                          bg="transparent"
                          _hover={{ bg: "transparent" }}
                          mr="15px"
                        />
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && (
                      <Text color="red">{errors.password.message} </Text>
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
