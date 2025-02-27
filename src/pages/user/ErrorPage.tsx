import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { useAuthQueryStore } from "../../store/auth-store";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { authStore } = useAuthQueryStore();
  const role = authStore.role;

  const handleNavigateClick = () => {
    if (role === "SELLER") {
      navigate("/seller");
    } else if (role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };
  const error = useRouteError();

  return (
    <>
      <Center mt="100px">
        <Box display="flex" flexDirection="column">
          <Heading>Oops...</Heading>
          <Text>
            {isRouteErrorResponse(error)
              ? "This page does not exist."
              : "An unexpected error occurred."}
          </Text>
          <Center>
            <Button
              textAlign="center"
              mt="20px"
              onClick={handleNavigateClick}
              width="120px"
              bg="orange.500"
              _hover={{ bg: "orange.600" }}
            >
              Return
            </Button>
          </Center>
        </Box>
      </Center>
    </>
  );
};

export default ErrorPage;
