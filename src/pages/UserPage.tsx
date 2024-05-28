import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaRegFileAlt, FaRegUser } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const UserPage = () => {
  const fontSize = useBreakpointValue({
    base: "sm",
    md: "md",
  });

  return (
    <Grid
      templateColumns="200px 300px 1fr 200px "
      templateAreas={`
      " asideLeft user main asideRight"     
      `}
      pt="25px"
    >
      <GridItem area="user">
        <Box>
          <Box display="flex" justifyContent="start" pt="26px" pl="20px">
            <Avatar
              name="Patrick"
              src="https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
              size="md"
            />
            <Box display="flex" flexDirection="column" alignItems="start">
              <Text fontSize={fontSize} pl="20px">
                Patrick@gmail.com
              </Text>
              <Text fontSize={fontSize} pl="20px">
                Edit Profile
              </Text>
            </Box>
          </Box>
          <Divider mt="15px" maxWidth="90%" />
          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            pt="20px"
            ml="15px"
            cursor="pointer"
          >
            <FaRegUser size="20px" />
            <Link to="/user/account/profile">
              <Text
                fontSize={fontSize}
                pl="15px"
                _hover={{ color: "orange.400" }}
              >
                My Account
              </Text>
            </Link>
          </Box>

          <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            pt="20px"
            ml="15px"
            cursor="pointer"
          >
            <FaRegFileAlt size="20px" />
            <Link to="/user/purchase">
              <Text
                fontSize={fontSize}
                pl="15px"
                _hover={{ color: "orange.400" }}
              >
                My Purchase
              </Text>
            </Link>
          </Box>
          <Text></Text>
        </Box>
      </GridItem>
      <GridItem area="main">
        <Box>
          <Card>
            <Outlet />
          </Card>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default UserPage;
