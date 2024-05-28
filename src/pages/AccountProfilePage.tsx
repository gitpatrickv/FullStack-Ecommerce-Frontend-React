import { Box, Button, Divider, Grid, GridItem, Text } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";

const AccountProfilePage = () => {
  return (
    <Grid
      templateRows="0.3fr 1fr"
      templateColumns=" 0.5fr 1fr 1fr "
      templateAreas={`
      "header header header "
    "content1 content2 content3 "
  `}
      gap={5}
      p={5}
    >
      <GridItem area="header">
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Text fontSize="xl" fontWeight="semibold">
            My Profile
          </Text>
          <Text fontSize="md">Manage and protect your account</Text>
          <Divider pt="15px" />
        </Box>
      </GridItem>
      <GridItem area="content1" pt="20px">
        <Box>
          <Box textAlign="end">
            <Text fontSize="md" mb="20px" fontWeight="semibold">
              Email
            </Text>
            <Text fontSize="md" fontWeight="semibold">
              Phone Number
            </Text>
          </Box>
        </Box>
      </GridItem>
      <GridItem area="content2" pt="20px">
        <Box textAlign="start">
          <Text fontSize="md" mb="20px">
            patrick@gmail.com
          </Text>
          <Text fontSize="md">0909090909</Text>
        </Box>
      </GridItem>

      <GridItem area="content3" pt="20px">
        <Box display="flex" justifyContent="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <FaRegUser size="100px" />
            <Button mt="20px">Select Image</Button>
            <Text mt="10px">File size: maximum 1 MB</Text>
            <Text>File extension: .JPEG, .PNG</Text>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default AccountProfilePage;
