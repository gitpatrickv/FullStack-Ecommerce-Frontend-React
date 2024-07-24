import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Store from "../../../entities/Store";
import useSuspendStoreListing from "../../../hooks/admin/useSuspendStoreListing";
import useGetTotalSales from "../../../hooks/seller/useGetTotalSales";
import { formatCurrency } from "../../../utilities/formatCurrency";
interface Props {
  store: Store;
  onRefetchStore: () => void;
}

const ShopList = ({ store, onRefetchStore }: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { mutate: toggleShopListing } = useSuspendStoreListing();
  const handleNavigateStorePageClick = () => {
    navigate(`/store/` + store.storeId);
  };
  const { data: totalSales } = useGetTotalSales(store.storeId);
  const handleSuspendClick = () => {
    toggleShopListing(store.storeId, {
      onSuccess: () => {
        onRefetchStore();
        onClose();
      },
    });
  };
  return (
    <Card mt="5px">
      <Grid
        templateColumns="0.2fr 1fr 0.2fr"
        templateAreas={`
  "header header header"
  "asideLeft content1 asideRight"
`}
      >
        <GridItem
          area="header"
          height="45px"
          border="1px solid"
          borderColor="gray.500"
        >
          <Box display="flex" ml="10px" mt="10px">
            <Avatar
              src={
                store.photoUrl ||
                "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
              }
              size="xs"
            />
            <Box
              border="1px solid"
              borderRadius="20px"
              bg={store.online ? "green" : "red"}
              borderColor={store.online ? "green" : "red"}
              width="10px"
              height="10px"
              textAlign="center"
              position="relative"
              left="-7px"
              bottom="-15px"
            />
            <Text
              textTransform="capitalize"
              fontWeight="semibold"
              color={store.online ? "white.500" : "red"}
            >
              {store.storeName}
            </Text>

            <Spacer />
            <Box
              cursor="pointer"
              display="flex"
              alignItems="center"
              _hover={{ color: "orange.400" }}
              mr="10px"
              onClick={handleNavigateStorePageClick}
            >
              <FaStore size="20px" />
              <Text pl="5px" fontSize="md">
                View Store
              </Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem area="asideLeft" border="1px solid" borderColor="gray.500">
          <Box display="flex" ml="10px" mt="5px" mb="5px" minWidth="250px">
            <Box display="flex" flexDirection="column">
              <Text fontWeight="semibold">Total Products:</Text>
              <Text fontWeight="semibold">Total Orders:</Text>
              <Text fontWeight="semibold">Total Sales:</Text>
            </Box>
            <Box display="flex" flexDirection="column">
              <Text fontWeight="semibold" ml="10px">
                {store.productCount}
              </Text>
              <Text fontWeight="semibold" ml="10px">
                {store.orderCount}
              </Text>
              <Text fontWeight="semibold" ml="10px">
                {formatCurrency(totalSales?.totalSales ?? 0)}
              </Text>
            </Box>
          </Box>
        </GridItem>

        <GridItem
          area="content1"
          borderRight="1px solid"
          border="1px solid"
          borderColor="gray.500"
        >
          <Box minWidth="600px" mt="5px" mb="5px" display="flex" ml="10px">
            <Box display="flex" flexDirection="column">
              <Text fontWeight="semibold">Contact #:</Text>
              <Text fontWeight="semibold">Email:</Text>
              <Text fontWeight="semibold">Address:</Text>
            </Box>
            <Box display="flex" flexDirection="column">
              <Text fontWeight="semibold" ml="10px">
                {store.contactNumber}
              </Text>
              <Text fontWeight="semibold" ml="10px">
                {store.email}
              </Text>
              <Text fontWeight="semibold" ml="10px">
                {store.address}
              </Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem area="asideRight" border="1px solid" borderColor="gray.500">
          <Box
            display="flex"
            mt="22px"
            minWidth="250px"
            justifyContent="space-around"
          >
            <Button
              cursor="pointer"
              fontWeight="semibold"
              fontSize="lg"
              bg={store.online === true ? "red.500" : "orange.500"}
              _hover={
                store.online === true ? { bg: "red.600" } : { bg: "orange.600" }
              }
              width="120px"
              onClick={onOpen}
            >
              {store.online === true ? "Suspend" : "Activate"}
            </Button>
          </Box>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  <Text color="orange.400" fontSize="large">
                    Would you like to{" "}
                    <Text as="span">
                      {store.online === true ? "suspend" : "activate"}
                    </Text>{" "}
                    this store?
                  </Text>
                </AlertDialogHeader>

                <AlertDialogBody>
                  <Text
                    textTransform="capitalize"
                    fontSize="lg"
                    fontWeight="semibold"
                  >
                    {store.storeName}
                  </Text>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    onClick={onClose}
                    width="100px"
                    _hover={{ color: "orange.400" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={store.online === true ? "red.500" : "orange.500"}
                    _hover={
                      store.online === true
                        ? { bg: "red.600" }
                        : { bg: "orange.600" }
                    }
                    onClick={handleSuspendClick}
                    ml={3}
                    width="100px"
                  >
                    {store.online === true ? "Suspend" : "Activate"}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default ShopList;
