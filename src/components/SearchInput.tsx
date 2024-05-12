import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

const SearchInput = () => {
  return (
    <InputGroup justifyContent={{ base: "center", md: "flex-center" }}>
      <InputLeftElement />
      <Input
        borderRadius={20}
        placeholder="Search products..."
        variant="filled"
        textAlign={{ base: "center", md: "left" }}
        style={{ width: "80%" }}
        maxWidth={{ base: "80%", md: "unset" }}
        mx={{ base: "auto", md: 0 }}
      />
    </InputGroup>
  );
};

export default SearchInput;
