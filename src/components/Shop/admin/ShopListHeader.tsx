import {
  Box,
  Card,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

const ShopListHeader = () => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  return (
    <Card mb="5px" borderRadius="none">
      <Grid
        templateColumns="0.2fr 1fr 0.2fr"
        templateAreas={`

"asideLeft content1 asideRight"
`}
      >
        <GridItem area="asideLeft" height="50px">
          <Box mt="10px" display="flex" justifyContent="center" width="260px">
            <Text fontSize={fontSize} fontWeight="semibold" whiteSpace="nowrap">
              Performance Metrics
            </Text>
          </Box>
        </GridItem>
        <GridItem area="content1" height="50px">
          <Box display="flex" justifyContent="center">
            <Text
              fontSize={fontSize}
              fontWeight="semibold"
              mt="10px"
              whiteSpace="nowrap"
            >
              Shop Information
            </Text>
          </Box>
        </GridItem>
        <GridItem area="asideRight" height="50px">
          <Box display="flex" justifyContent="center" width="250px">
            <Text fontSize={fontSize} fontWeight="semibold" mt="10px">
              Action
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ShopListHeader;
