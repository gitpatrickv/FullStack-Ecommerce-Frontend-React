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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { UserProps } from "../../../hooks/admin/useGetAllUsers";
import useFreezeUserAccount from "../../../hooks/admin/useFreezeUserAccount";
import { useRef } from "react";

interface Props {
  user: UserProps;
  onRefetchUser: () => void;
}

const UserList = ({ user, onRefetchUser }: Props) => {
  const { mutate: freezeAccount } = useFreezeUserAccount();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleFreezeAccountClick = () => {
    freezeAccount(user.email, {
      onSuccess: () => {
        onRefetchUser();
        onClose();
      },
    });
  };

  return (
    <Card borderRadius="none" mb="1px">
      <Grid
        templateColumns="0.3fr 0.2fr 0.3fr 0.2fr 0.2fr 0.2fr"
        templateAreas={`

"name mobile email role status action"
`}
        padding={1}
      >
        <GridItem area="name">
          <Box display="flex" ml="10px" mt="10px" mb="10px" minWidth="200px">
            <Avatar
              src={
                user.photoUrl ||
                "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
              }
              size="xs"
              border="1px solid gray"
            />
            <Box
              border="1px solid"
              borderRadius="20px"
              bg={user.frozen ? "red" : "green"}
              borderColor={user.frozen ? "red" : "green"}
              width="10px"
              height="10px"
              textAlign="center"
              position="relative"
              left="-7px"
              bottom="-15px"
            />
            <Text ml="5px">{user.name}</Text>
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
            <Text>{user.contactNumber}</Text>
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
            <Text>{user.email}</Text>
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
            <Text>{user.role}</Text>
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
            <Text color={user.frozen ? "red" : "white.500"}>
              {user.frozen ? "FROZEN" : "ACTIVE"}
            </Text>
          </Box>
        </GridItem>
        <GridItem area="action">
          <Box display="flex" justifyContent="center" minWidth="200px" mt="5px">
            <Button
              bg={user.frozen ? "orange.500" : "red.500"}
              _hover={{
                bg: user.frozen ? "orange.600" : "red.600",
              }}
              onClick={onOpen}
              height="35px"
              width="100px"
            >
              <Text mb="2px">{user.frozen ? "Unfreeze" : "Freeze"}</Text>
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
                    <Text as="span">{user.frozen ? "unfreeze" : "freeze"}</Text>{" "}
                    this account?
                  </Text>
                </AlertDialogHeader>

                <AlertDialogBody>
                  <Box display="flex">
                    <Box display="flex" flexDirection="column" mr="5px">
                      <Text fontSize="lg" fontWeight="semibold">
                        Name:
                      </Text>
                      <Text fontSize="lg" fontWeight="semibold">
                        Email:
                      </Text>
                    </Box>
                    <Box display="flex" flexDirection="column">
                      <Text fontSize="lg" fontWeight="semibold">
                        {user.name}
                      </Text>
                      <Text fontSize="lg" fontWeight="semibold">
                        {user.email}
                      </Text>
                    </Box>
                  </Box>
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
                    bg={user.frozen ? "orange.500" : "red.500"}
                    _hover={{
                      bg: user.frozen ? "orange.600" : "red.600",
                    }}
                    onClick={handleFreezeAccountClick}
                    ml={3}
                    width="100px"
                  >
                    Confirm
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

export default UserList;
