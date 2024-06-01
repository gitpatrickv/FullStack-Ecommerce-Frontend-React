import {
  Box,
  Button,
  Divider,
  FormControl,
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
import useChangePassword from "../hooks/useChangePassword";

const ChangePasswordPage = () => {
  const { onSubmit, loading, register, handleSubmit } = useChangePassword();
  const isTruncated = useBreakpointValue({ base: true });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
  });
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
      templateColumns=" 0.5fr 1fr 0.5fr"
      templateAreas={`
      "header header header"
    "content1 content2 content3"
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
      <GridItem area="content1" pt="30px" whiteSpace="nowrap">
        <Box>
          <Box textAlign="end">
            <Text fontSize={fontSize} mb="33px" fontWeight="semibold">
              Current Password
            </Text>
            <Text fontSize={fontSize} mb="33px" fontWeight="semibold">
              New Password
            </Text>
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              isTruncated={isTruncated}
            >
              Confirm Password
            </Text>
          </Box>
        </Box>
      </GridItem>

      <GridItem area="content2" pt="20px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box textAlign="start">
            <FormControl pb="20px">
              <InputGroup>
                <Input
                  disabled={loading}
                  {...register("oldPassword")}
                  type={showOldPassword ? "text" : "password"}
                  borderColor="gray.500"
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
            </FormControl>

            <FormControl pb="20px">
              <InputGroup>
                <Input
                  disabled={loading}
                  {...register("newPassword")}
                  type={showNewPassword ? "text" : "password"}
                  borderColor="gray.500"
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
            </FormControl>

            <FormControl pb="20px">
              <InputGroup>
                <Input
                  disabled={loading}
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  borderColor="gray.500"
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
    </Grid>
  );
};

export default ChangePasswordPage;
