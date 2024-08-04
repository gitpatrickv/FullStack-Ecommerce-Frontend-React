import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { RiEyeCloseLine } from "react-icons/ri";
import useRegisterNewAdmin from "../../../hooks/admin/useRegisterNewAdmin";

const Header = () => {
  const {
    register,
    handleSubmit,
    loading,
    onSubmit,
    errors,
    isOpen,
    onOpen,
    onClose,
  } = useRegisterNewAdmin();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPasswordClick = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Card borderRadius="none" padding={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="semibold">
          User List
        </Text>
        <Box display="flex" alignItems="center">
          <Text fontSize="xl" fontWeight="semibold" mr="10px">
            New Admin
          </Text>
          <IconButton
            icon={<FaPlus />}
            aria-label="Add"
            colorScheme="orange"
            onClick={onOpen}
          />
        </Box>
      </Box>
      <Box>
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
          <ModalOverlay />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(onSubmit)(event);
            }}
          >
            <ModalContent>
              <ModalCloseButton />
              <ModalBody mt="30px">
                <Box>
                  <Text
                    fontSize="xl"
                    fontWeight="semibold"
                    textTransform="capitalize"
                    mb="20px"
                  >
                    Set Up a New Admin Account
                  </Text>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleSubmit(onSubmit)(event);
                    }}
                  >
                    <Stack spacing={3}>
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
                          <Text color="red">
                            {errors.contactNumber.message}
                          </Text>
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
                        <FormLabel color="white.500">
                          Confirm Password
                        </FormLabel>
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
                          <Text color="red">
                            {errors.confirmPassword.message}
                          </Text>
                        )}
                      </FormControl>
                      <FormControl>
                        <Input
                          {...register("role")}
                          defaultValue="ADMIN"
                          type="hidden"
                        />
                      </FormControl>
                    </Stack>
                  </form>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button
                  _hover={{ color: "orange.400" }}
                  onClick={onClose}
                  width="100px"
                >
                  Close
                </Button>
                <Button
                  ml="5px"
                  type="submit"
                  bg="orange.500"
                  _hover={{ bg: "orange.600" }}
                  width="100px"
                >
                  Register
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </Box>
    </Card>
  );
};

export default Header;
