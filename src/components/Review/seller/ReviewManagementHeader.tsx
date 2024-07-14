import {
  Box,
  Card,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

const ReviewManagementHeader = () => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  return (
    <Card mb="10px">
      <Grid
        templateColumns="0.2fr 0.6fr 0.2fr"
        templateAreas={`

  "asideLeft content1 asideRight"
`}
      >
        <GridItem area="asideLeft" height="50px">
          <Box mt="10px" ml="10px" display="flex" justifyContent="center">
            <Text fontSize={fontSize} fontWeight="semibold">
              Product Information
            </Text>
          </Box>
        </GridItem>
        <GridItem area="content1" height="50px">
          <Box display="flex" justifyContent="center">
            <Text fontSize={fontSize} fontWeight="semibold" mt="10px">
              Buyer's Review
            </Text>
          </Box>
        </GridItem>
        <GridItem area="asideRight" height="50px">
          <Box display="flex" justifyContent="center">
            <Text fontSize={fontSize} fontWeight="semibold" mt="10px">
              Actions
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ReviewManagementHeader;
