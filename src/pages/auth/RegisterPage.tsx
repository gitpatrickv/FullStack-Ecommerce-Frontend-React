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
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { RiEyeCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import useRegisterUser from "../../hooks/user/useRegisterUser";
// import ReCAPTCHA from "react-google-recaptcha";

const RegisterPage = () => {
  const { register, handleSubmit, loading, onSubmit, errors } =
    useRegisterUser();
  // const [captcha, setCaptcha] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPasswordClick = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const handleCaptchaClick = (value: string | null) => {
  //   if (value !== null) {
  //     setCaptcha(value);
  //   } else {
  //     setCaptcha("");
  //   }
  // };

  return (
    <Box>
      <Center>
        <Stack spacing="5">
          <VStack as="header">
            <Heading>Register</Heading>
          </VStack>
          <Card
            variant="outline"
            borderColor="gray"
            w="500px"
            borderRadius="none"
          >
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
                <Stack>
                  <FormControl>
                    <FormLabel color="white.500">Email</FormLabel>
                    <Input
                      {...register("email", { required: true })}
                      type="text"
                      placeholder="Email"
                      disabled={loading}
                    />
                    {errors.email && (
                      <Text color="red">{errors.email.message}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel color="white.500">Name</FormLabel>
                    <Input
                      {...register("name", { required: true })}
                      type="text"
                      placeholder="Full Name"
                      disabled={loading}
                    />
                    {errors.name && (
                      <Text color="red">{errors.name.message}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel color="white.500">Address</FormLabel>
                    <Input
                      {...register("address", { required: true })}
                      type="text"
                      placeholder="Address"
                      disabled={loading}
                    />
                    {errors.address && (
                      <Text color="red">{errors.address.message}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel color="white.500">Contact Number</FormLabel>
                    <Input
                      {...register("contactNumber", { required: true })}
                      type="text"
                      placeholder="Contact Number"
                      disabled={loading}
                    />
                    {errors.contactNumber && (
                      <Text color="red">{errors.contactNumber.message}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel color="white.500">Password</FormLabel>
                    <InputGroup>
                      <Input
                        {...register("password", { required: true })}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        disabled={loading}
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
                      <Text color="red">{errors.password.message}</Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel color="white.500">Confirm Password</FormLabel>
                    <InputGroup>
                      <Input
                        {...register("confirmPassword", { required: true })}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        disabled={loading}
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label="show"
                          icon={
                            showConfirmPassword ? (
                              <IoIosEye size="25px" />
                            ) : (
                              <RiEyeCloseLine size="25px" />
                            )
                          }
                          onClick={handleShowConfirmPasswordClick}
                          bg="transparent"
                          _hover={{ bg: "transparent" }}
                          mr="15px"
                        />
                      </InputRightElement>
                    </InputGroup>
                    {errors.confirmPassword && (
                      <Text color="red">{errors.confirmPassword.message}</Text>
                    )}
                  </FormControl>
                  <FormControl mb="5px">
                    <FormLabel color="white.500">Role</FormLabel>
                    <Select
                      {...register("role", { required: true })}
                      id="role"
                      defaultValue="USER"
                      disabled={loading}
                    >
                      <option value="USER">User</option>
                      <option value="SELLER">Seller</option>
                    </Select>
                    {errors.role && (
                      <Text color="red">{errors.role.message}</Text>
                    )}
                  </FormControl>
                  {/* <ReCAPTCHA
                    sitekey="6Ld5ciEqAAAAAOMHz2mlCAsMuVwWC_imsKWpfd-K"
                    onChange={handleCaptchaClick}
                  /> */}
                  <Button
                    isLoading={loading}
                    type="submit"
                    bg="orange.400"
                    _hover={{ bg: "orange.500" }}
                    _active={{ bg: "orange.600" }}
                    mt="5px"
                    // isDisabled={!captcha}
                  >
                    Register
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>
          <Card
            variant="outline"
            borderColor="gray"
            w="500px"
            borderRadius="none"
          >
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
