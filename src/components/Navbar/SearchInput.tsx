import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = ref.current?.value || "";
    setSearchText(text);
    navigate(`/search?keyword=${encodeURIComponent(text)}&pageNo=&pageSize=`);
  };

  const query = searchParams.get("keyword") || "";
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <InputGroup justifyContent={{ base: "center", md: "flex-start" }}>
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="Search products..."
            variant="filled"
            textAlign={{ base: "center", md: "left" }}
            fontSize={["sm", "md", "lg"]}
            defaultValue={query}
            w={{ base: "100%" }}
          />
          <InputRightElement>
            <IconButton
              aria-label="Search"
              icon={<BsSearch />}
              type="submit"
              bg="transparent"
              _hover={{ bg: "transparent" }}
            />
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchInput;
