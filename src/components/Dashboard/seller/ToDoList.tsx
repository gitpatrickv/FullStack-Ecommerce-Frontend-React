import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useGetTodoTotal from "../../../hooks/seller/useGetTodoTotal";

interface Props {
  storeId: string;
}

const ToDoList = ({ storeId }: Props) => {
  const location = useLocation();
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
  });

  const { data: getTodoTotal, refetch: refetchTodoTotal } =
    useGetTodoTotal(storeId);

  useEffect(() => {
    if (location.pathname === "/seller") {
      refetchTodoTotal();
    }
  }, [location.pathname]);

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
              To Do List
            </Text>
            <Text color="gray.500">Things you need to deal with</Text>
          </GridItem>
          <GridItem area="content1">
            <Link to={`/seller/order/pending/${storeId}`}>
              <Box
                display="flex"
                justifyContent="center"
                cursor="pointer"
                _hover={{ border: "1px solid", borderColor: "gray.500" }}
                userSelect="none"
              >
                <Box display="flex" flexDirection="column" textAlign="center">
                  <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                    {getTodoTotal?.pendingOrderTotal ?? 0}
                  </Text>
                  <Text fontSize={fontSize} fontWeight="semibold">
                    Pending
                  </Text>
                </Box>
              </Box>
            </Link>
          </GridItem>

          <GridItem area="content2">
            <Link to={`/seller/order/unpaid/${storeId}`}>
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
                    {getTodoTotal?.toProcessShipmentTotal ?? 0}
                  </Text>
                  <Text
                    fontSize={fontSize}
                    fontWeight="semibold"
                    whiteSpace="nowrap"
                  >
                    To-Process Shipment
                  </Text>
                </Box>
              </Box>
            </Link>
          </GridItem>

          <GridItem area="content3">
            <Link to={`/seller/order/to-ship/${storeId}`}>
              <Box
                display="flex"
                justifyContent="center"
                cursor="pointer"
                _hover={{ border: "1px solid", borderColor: "gray.500" }}
                userSelect="none"
              >
                <Box display="flex" flexDirection="column" textAlign="center">
                  <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                    {getTodoTotal?.processedShipmentTotal ?? 0}
                  </Text>
                  <Text
                    fontSize={fontSize}
                    fontWeight="semibold"
                    whiteSpace="nowrap"
                  >
                    Processed Shipment
                  </Text>
                </Box>
              </Box>
            </Link>
          </GridItem>

          <GridItem area="content4">
            <Link to={`/seller/order/cancelled/${storeId}`}>
              <Box
                display="flex"
                justifyContent="center"
                cursor="pointer"
                _hover={{ border: "1px solid", borderColor: "gray.500" }}
                userSelect="none"
              >
                <Box display="flex" flexDirection="column" textAlign="center">
                  <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                    {getTodoTotal?.pendingCancelledOrders ?? 0}
                  </Text>
                  <Text
                    fontSize={fontSize}
                    fontWeight="semibold"
                    whiteSpace="nowrap"
                  >
                    Pending Cancellation
                  </Text>
                </Box>
              </Box>
            </Link>
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
                  Sold Out Products
                </Text>
              </Box>
            </Box>
            <Box></Box>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default ToDoList;
