import {
  Box,
  Card,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

const UserListHeader = () => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  return (
    <Card borderRadius="none" mb="5px">
      <Grid
        templateColumns="0.3fr 0.2fr 0.3fr 0.2fr 0.2fr 0.2fr"
        templateAreas={`

"name mobile email role status action"
`}
        padding={1}
      >
        <GridItem area="name">
          <Box display="flex" ml="10px" mt="10px" mb="10px" minWidth="200px">
            <Text ml="5px" fontSize={fontSize} fontWeight="semibold">
              Name
            </Text>
          </Box>
        </GridItem>
        <GridItem area="mobile">
          <Box
            mt="10px"
            mb="10px"
            display="flex"
            justifyContent="center"
            minWidth="200px"
          >
            <Text fontSize={fontSize} fontWeight="semibold" whiteSpace="nowrap">
              Contact Number
            </Text>
          </Box>
        </GridItem>
        <GridItem area="email">
          <Box
            mt="10px"
            mb="10px"
            display="flex"
            justifyContent="center"
            minWidth="200px"
          >
            <Text fontSize={fontSize} fontWeight="semibold">
              Email
            </Text>
          </Box>
        </GridItem>
        <GridItem area="role">
          <Box
            mt="10px"
            mb="10px"
            display="flex"
            justifyContent="center"
            minWidth="100px"
          >
            <Text fontSize={fontSize} fontWeight="semibold">
              Role
            </Text>
          </Box>
        </GridItem>
        <GridItem area="status">
          <Box
            mt="10px"
            mb="10px"
            display="flex"
            justifyContent="center"
            minWidth="100px"
          >
            <Text fontSize={fontSize} fontWeight="semibold">
              Status
            </Text>
          </Box>
        </GridItem>
        <GridItem area="action">
          <Box
            mt="10px"
            mb="10px"
            display="flex"
            justifyContent="center"
            minWidth="200px"
          >
            <Text fontSize={fontSize} fontWeight="semibold">
              Action
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default UserListHeader;
