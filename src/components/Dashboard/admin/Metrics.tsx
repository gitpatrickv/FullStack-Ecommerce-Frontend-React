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
import useGetOrderCount from "../../../hooks/admin/useGetOrderCount";
import { formatCurrency } from "../../../utilities/formatCurrency";

const Metrics = () => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
  });

  const { data: userCount } = useGetUserCount();
  const { data: productCount } = useGetProductCount();
  const { data: storeCount } = useGetStoreCount();
  const { data: orderCount } = useGetOrderCount();

  return (
    <Card borderRadius="none">
      <CardBody>
        <Grid
          templateRows="0.3fr 0.7fr"
          templateColumns="0.2fr 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr"
          templateAreas={`
      "header header header header header header"
      "content1 content2 content3 content4 content5 content6"
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
            <Box display="flex" justifyContent="center" userSelect="none">
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {userCount?.userCount ?? 0}
                </Text>
                <Text fontSize={fontSize} fontWeight="semibold">
                  Total Users
                </Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem area="content2">
            <Box display="flex" justifyContent="center" userSelect="none">
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {storeCount?.storeCount ?? 0}
                </Text>
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Total Shop
                </Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem area="content3">
            <Box display="flex" justifyContent="center" userSelect="none">
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

          <GridItem area="content5">
            <Box display="flex" justifyContent="center" userSelect="none">
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {formatCurrency(orderCount?.totalSales ?? 0)}
                </Text>
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Product Revenue
                </Text>
              </Box>
            </Box>
          </GridItem>
          <GridItem area="content4">
            <Box display="flex" justifyContent="center" userSelect="none">
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {orderCount?.orderCount ?? 0}
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
          <GridItem area="content6">
            <Box display="flex" justifyContent="center" userSelect="none">
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {formatCurrency(orderCount?.totalShippingFee ?? 0)}
                </Text>
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Shipping Revenue
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
