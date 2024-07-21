import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import useGetUserCount from "../../../hooks/admin/useGetUserCount";
import useGetProductCount from "../../../hooks/admin/useGetProductCount";
import useGetStoreCount from "../../../hooks/admin/useGetStoreCount";

const Metrics = () => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
  });

  const { data: userCount } = useGetUserCount();
  const { data: productCount } = useGetProductCount();
  const { data: storeCount } = useGetStoreCount();

  return (
    <Card>
      <CardBody>
        <Grid
          templateRows="0.3fr 0.7fr"
          templateColumns="0.2fr 0.2fr 0.2fr 0.2fr 0.2fr"
          templateAreas={`
      "header header header header header"
      "content1 content2 content3 content4 content5"
  `}
          gap={4}
          p={3}
        >
          <GridItem area="header" mb="10px">
            <Text fontSize="xl" fontWeight="bold">
              Key Metrics
            </Text>
          </GridItem>
          <GridItem area="content1">
            <Box
              display="flex"
              justifyContent="center"
              cursor="pointer"
              _hover={{ border: "1px solid", borderColor: "gray.500" }}
              userSelect="none"
            >
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {userCount?.userCount ?? 0}
                </Text>
                <Text fontSize={fontSize} fontWeight="semibold">
                  Registered Users
                </Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem area="content2">
            <Box
              display="flex"
              justifyContent="center"
              cursor="pointer"
              _hover={{
                border: "1px solid",
                borderColor: "gray.500",
              }}
              userSelect="none"
            >
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {storeCount?.storeCount ?? 0}
                </Text>
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Registered Store
                </Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem area="content3">
            <Box
              display="flex"
              justifyContent="center"
              cursor="pointer"
              _hover={{ border: "1px solid", borderColor: "gray.500" }}
              userSelect="none"
            >
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {productCount?.productCount ?? 0}
                </Text>
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Total Products
                </Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem area="content4">
            <Box
              display="flex"
              justifyContent="center"
              cursor="pointer"
              _hover={{ border: "1px solid", borderColor: "gray.500" }}
              userSelect="none"
            >
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  0
                </Text>
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Total Sales
                </Text>
              </Box>
            </Box>
          </GridItem>
          <GridItem area="content5">
            <Box
              display="flex"
              justifyContent="center"
              cursor="pointer"
              _hover={{ border: "1px solid", borderColor: "gray.500" }}
              userSelect="none"
            >
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  0
                </Text>
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Total Orders
                </Text>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Metrics;