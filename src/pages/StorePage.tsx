import { Avatar, Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";

const StorePage = () => {
  return (
    <Grid
      height="100vh"
      templateColumns="0.2fr 0.5fr 0.5fr 0.5fr 0.2fr"
      templateRows="0.2fr 1fr"
      templateAreas={`
        " asideLeft header1 header2 header3 asideRight"
        "asideLeft content1 content1 content1 asideRight"
      `}
    >
      <GridItem area="header1">
        <Box display="flex" justifyContent="start">
          <Box position="relative" top="20px">
            <Avatar
              src={
                "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
              }
              size="xl"
            />
          </Box>
          <Text ml="15px" fontSize="x-large" mt="15px">
            Watsons Official Store
          </Text>
        </Box>
      </GridItem>
      <GridItem area="header2">
        <Box bg="blue" height="100%">
          header2
        </Box>
      </GridItem>
      <GridItem area="header3">
        <Box bg="orange" height="100%">
          header3
        </Box>
      </GridItem>
      <GridItem area="content1">
        <Box bg="red" height="100%">
          Content 1
        </Box>
      </GridItem>
    </Grid>
  );
};

export default StorePage;
