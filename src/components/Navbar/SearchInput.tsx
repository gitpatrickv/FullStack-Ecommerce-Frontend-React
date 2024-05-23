import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <InputGroup justifyContent={{ base: "center", md: "flex-center" }}>
      <InputLeftElement />
      <Input
        borderRadius={20}
        placeholder="Search products..."
        variant="filled"
        textAlign={{ base: "center", md: "left" }}
        style={{ width: "60%" }}
        maxWidth={{ base: "80%", md: "unset" }}
        mx={{ base: "auto", md: 0 }}
        fontSize={["sm", "md", "lg"]}
      />
      <Box
        position="relative"
        right={{
          base: "70px",
          md: "40px",
          xl: "45px",
        }}
        top="8px"
      >
        <FaSearch size="22px" />
      </Box>
    </InputGroup>
  );
};

export default SearchInput;
