import { Box, Card, CardBody, Text } from "@chakra-ui/react";

import { IoLocation } from "react-icons/io5";
import useGetUser from "../../hooks/useGetUser";

const UserInfo = () => {
  const jwtToken = localStorage.getItem("jwtToken");
  const { data: user } = useGetUser(jwtToken || "");

  return (
    <Box>
      <Card maxW={{ base: "100%", lg: "70%" }} margin="auto">
        <CardBody>
          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            pb="20px"
          >
            <IoLocation size="25px" color="orange" />
            <Text
              pl="5px"
              fontSize={["sm", "md", "lg"]}
              fontWeight="semibold"
              color="orange"
            >
              Delivery Address
            </Text>
          </Box>
          <Box display="flex">
            <Text pr="25px" fontSize={["sm", "md", "lg"]} fontWeight="semibold">
              {user?.data.name}
            </Text>
            <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold">
              {user?.data.address}
            </Text>
          </Box>
          <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold">
            {user?.data.contactNumber}
          </Text>
        </CardBody>
      </Card>
    </Box>
  );
};

export default UserInfo;
