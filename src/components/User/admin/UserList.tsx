import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { UserProps } from "../../../hooks/admin/useGetAllUsers";

interface Props {
  user: UserProps;
}

const UserList = ({ user }: Props) => {
  return (
    <Card borderRadius="none">
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
            <Text>status</Text>
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
            <Button variant="link">action</Button>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default UserList;
