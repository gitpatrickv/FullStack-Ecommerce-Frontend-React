import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

const SearchInput = () => {
  return (
    <InputGroup justifyContent="center">
      <InputLeftElement />
      <Input
        borderRadius={20}
        placeholder="Search products..."
        variant="filled"
        style={{ width: "85%" }}
      />
    </InputGroup>
  );
};

export default SearchInput;
