import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import useGetSuspendedProductCount from "../../../hooks/admin/useGetSuspendedProductCount";
import useGetTotalSales from "../../../hooks/seller/useGetTotalSales";
import useGetStoreFollowerCount from "../../../hooks/user/useGetStoreFollowerCount";
import { formatCurrency } from "../../../utilities/formatCurrency";

interface Props {
  orderCount: number;
  productCount: number;
  storeId: string;
}

const BusinessInsights = ({ orderCount, productCount, storeId }: Props) => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
  });

  const { data: totalSales } = useGetTotalSales(storeId);
  const { data: suspendedProductCount } = useGetSuspendedProductCount(storeId);
  const { data: storeFollowerCount } = useGetStoreFollowerCount(storeId);

  return (
    <Card mt="5px" borderRadius="none" minWidth="1000px">
      <CardBody>
        <Grid
          templateRows="0.3fr 0.7fr"
          templateColumns="0.3fr 0.3fr 0.3fr 0.3fr 0.3fr"
          templateAreas={`
      "header header header header header"
      "content1 content2 content3 content4 content5"
  `}
          gap={4}
          p={3}
        >
          <GridItem area="header" mb="10px">
            <Text fontSize="xl" fontWeight="bold">
              Business Insights
            </Text>
            <Text color="gray.500">An overview of the shop data</Text>
          </GridItem>
          <GridItem area="content1">
            <Box display="flex" justifyContent="center" userSelect="none">
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {formatCurrency(totalSales?.totalSales ?? 0)}
                </Text>
                <Text fontSize={fontSize} fontWeight="semibold">
                  Total Sales
                </Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem area="content2">
            <Box display="flex" justifyContent="center" userSelect="none">
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {orderCount}
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

          <GridItem area="content3">
            <Box display="flex" justifyContent="center" userSelect="none">
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {productCount}
                </Text>
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Products
                </Text>
              </Box>
            </Box>
          </GridItem>
          <GridItem area="content4">
            <Box display="flex" justifyContent="center" userSelect="none">
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {suspendedProductCount?.suspendedProductCount ?? 0}
                </Text>
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Suspended Product(s)
                </Text>
              </Box>
            </Box>
          </GridItem>
          <GridItem area="content5">
            <Box display="flex" justifyContent="center" userSelect="none">
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {storeFollowerCount?.storeFollowerCount ?? 0}
                </Text>
                <Text
                  fontSize={fontSize}
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Follower
                </Text>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default BusinessInsights;
