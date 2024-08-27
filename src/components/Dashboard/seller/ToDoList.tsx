import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGetOutOfStock from "../../../hooks/seller/useGetOutOfStock";
import useGetTodoTotal from "../../../hooks/seller/useGetTodoTotal";
import SoldOut from "./SoldOut";

interface Props {
  storeId: string;
}

const ToDoList = ({ storeId }: Props) => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: getTodoTotal } = useGetTodoTotal(storeId);
  const { data: getAllOutOfStock } = useGetOutOfStock(storeId);

  useEffect(() => {
    if (getTodoTotal?.outOfStock === 0) {
      onClose();
    }
  });

  return (
    <Card borderRadius="none">
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
              onClick={onOpen}
            >
              <Box display="flex" flexDirection="column" textAlign="center">
                <Text color="blue.500" fontSize="lg" fontWeight="semibold">
                  {getTodoTotal?.outOfStock ?? 0}
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

            <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Sold Out Products</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box>
                    <Grid
                      templateColumns="0.3fr 0.2fr 0.2fr 0.2fr 0.2fr"
                      templateAreas={`
"content1 content2 content3 content4 content5 "
`}
                      p={3}
                    >
                      <GridItem area="content1">
                        <Box>
                          <Text
                            fontSize="md"
                            fontWeight="semibold"
                            color="orange.400"
                            whiteSpace="nowrap"
                          >
                            Product
                          </Text>
                        </Box>
                      </GridItem>
                      <GridItem
                        area="content2"
                        display="flex"
                        justifyContent="center"
                      >
                        <Text
                          fontSize="md"
                          fontWeight="semibold"
                          color="orange.400"
                        >
                          Quantity
                        </Text>
                      </GridItem>
                      <GridItem
                        area="content3"
                        display="flex"
                        justifyContent="center"
                      >
                        <Text
                          fontSize="md"
                          fontWeight="semibold"
                          color="orange.400"
                        >
                          Variants
                        </Text>
                      </GridItem>
                      <GridItem
                        area="content4"
                        display="flex"
                        justifyContent="center"
                      >
                        <Text
                          fontSize="md"
                          fontWeight="semibold"
                          color="orange.400"
                          ml="3px"
                        >
                          Size
                        </Text>
                      </GridItem>
                      <GridItem
                        area="content5"
                        display="flex"
                        justifyContent="center"
                      >
                        <Text
                          fontSize="md"
                          fontWeight="semibold"
                          color="orange.400"
                        >
                          Action
                        </Text>
                      </GridItem>
                    </Grid>
                  </Box>

                  {getAllOutOfStock?.map((inv) => (
                    <Box key={inv.inventoryId}>
                      <SoldOut inventory={inv} />
                      <Divider />
                    </Box>
                  ))}
                </ModalBody>

                <ModalFooter>
                  <Button onClick={onClose} _hover={{ color: "orange.400" }}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default ToDoList;
