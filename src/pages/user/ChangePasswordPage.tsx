import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { RiEyeCloseLine } from "react-icons/ri";
import useChangePassword from "../../hooks/user/useChangePassword";

const ChangePasswordPage = () => {
  const { onSubmit, loading, register, handleSubmit, errors } =
    useChangePassword();
  const isTruncated = useBreakpointValue({ base: true });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowOldPasswordClick = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleShowNewPasswordClick = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPasswordClick = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Grid
      templateRows="0.3fr 1fr"
      templateColumns="1fr"
      templateAreas={`
      "header"
    "content2"
  `}
      gap={5}
      p={5}
    >
      <GridItem area="header">
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Text fontSize="xl" fontWeight="semibold">
            Change Password
          </Text>
          <Text fontSize="md" whiteSpace="nowrap" isTruncated={isTruncated}>
            For your account's security, do not share your password with anyone
            else
          </Text>
          <Divider pt="15px" />
        </Box>
      </GridItem>
      <GridItem area="content2" mt="15px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box ml="30px">
            <FormControl pb="20px">
              <Box display="flex">
                <FormLabel mt="10px" ml="2px" whiteSpace="nowrap" mr="30px">
                  Current Password
                </FormLabel>
                <Box display="flex" flexDirection="column">
                  <InputGroup>
                    <Input
                      disabled={loading}
                      {...register("oldPassword")}
                      type={showOldPassword ? "text" : "password"}
                      borderColor="gray.500"
                      minWidth="400px"
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label="show"
                        icon={
                          showOldPassword ? (
                            <IoIosEye size="25px" />
                          ) : (
                            <RiEyeCloseLine size="25px" />
                          )
                        }
                        onClick={handleShowOldPasswordClick}
                        bg="transparent"
                        _hover={{ bg: "transparent" }}
                        mr="15px"
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errors.oldPassword && (
                    <Text color="red">{errors.oldPassword.message}</Text>
                  )}
                </Box>
              </Box>
            </FormControl>

            <FormControl pb="20px">
              <Box display="flex">
                <FormLabel mt="10px" ml="2px" whiteSpace="nowrap" mr="52px">
                  New Password
                </FormLabel>
                <Box display="flex" flexDirection="column">
                  <InputGroup>
                    <Input
                      disabled={loading}
                      {...register("newPassword")}
                      type={showNewPassword ? "text" : "password"}
                      borderColor="gray.500"
                      minWidth="400px"
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label="show"
                        icon={
                          showNewPassword ? (
                            <IoIosEye size="25px" />
                          ) : (
                            <RiEyeCloseLine size="25px" />
                          )
                        }
                        onClick={handleShowNewPasswordClick}
                        bg="transparent"
                        _hover={{ bg: "transparent" }}
                        mr="15px"
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errors.newPassword && (
                    <Text color="red">{errors.newPassword.message}</Text>
                  )}
                  {errors.changePasswordRequest && (
                    <Text color="red">
                      {errors.changePasswordRequest.message}
                    </Text>
                  )}
                </Box>
              </Box>
            </FormControl>

            <FormControl pb="20px">
              <Box display="flex">
                <FormLabel mt="10px" ml="2px" whiteSpace="nowrap" mr="26px">
                  Confirm Password
                </FormLabel>
                <Box display="flex" flexDirection="column">
                  <InputGroup>
                    <Input
                      disabled={loading}
                      {...register("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      borderColor="gray.500"
                      minWidth="400px"
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
                  {errors.changePasswordRequest && (
                    <Text color="red">
                      {errors.changePasswordRequest.message}
                    </Text>
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
              ml="158px"
            >
              Save
            </Button>
          </Box>
        </form>
      </GridItem>
    </Grid>
  );
};

export default ChangePasswordPage;
