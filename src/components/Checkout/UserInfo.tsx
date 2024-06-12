import {
  Box,
  Card,
  CardBody,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import { IoLocation } from "react-icons/io5";
import useGetUser from "../../hooks/user/useGetUser";
import { useAuthQueryStore } from "../../store/auth-store";

const UserInfo = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { data: user } = useGetUser(jwtToken);
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });

  return (
    <Box>
      <Card maxW="100%">
        <CardBody>
          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            pb="5px"
          >
            <IoLocation size="25px" color="orange" />
            <Text
              pl="5px"
              fontSize={fontSize}
              fontWeight="semibold"
              color="orange"
            >
              Delivery Address
            </Text>
          </Box>

          <Text fontSize={fontSize} fontWeight="semibold">
            {user?.name}
          </Text>
          <Text fontSize={fontSize} fontWeight="semibold">
            {user?.contactNumber}
          </Text>
          <Text fontSize={fontSize} fontWeight="semibold">
            {user?.address}
          </Text>
        </CardBody>
      </Card>
    </Box>
  );
};

export default UserInfo;
