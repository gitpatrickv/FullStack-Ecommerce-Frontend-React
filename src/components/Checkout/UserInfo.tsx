import { Box, Card, CardBody, Text } from "@chakra-ui/react";

import { IoLocation } from "react-icons/io5";

const UserInfo = () => {
  return (
    <Box>
      <Card maxW="70%" margin="auto">
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
              Name asdasdasdasasd
            </Text>
            <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold">
              Address Here
            </Text>
          </Box>
          <Text fontSize={["sm", "md", "lg"]} fontWeight="semibold">
            Contact Number
          </Text>
        </CardBody>
      </Card>
    </Box>
  );
};

export default UserInfo;
