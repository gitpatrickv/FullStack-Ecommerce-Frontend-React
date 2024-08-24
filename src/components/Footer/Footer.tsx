import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import MyLinks from "./MyLinks";

const Footer = () => {
  return (
    <Card borderRadius="none" as="footer" bottom="0" width="100%" mt="auto">
      <CardBody>
        <Box display="flex" flexDirection="column" alignItems="center">
          <MyLinks />
          <Text mr="5px" mt="10px">
            Built using:
          </Text>
          <Text>
            Frontend: React, Typescript, Chakra UI, React Query, Zustand
          </Text>
          <Text>Backend: Spring Boot, Java 17, MySQL</Text>
          <Text mt="10px">© 2024 Patrick V. All rights reserved.</Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Footer;
