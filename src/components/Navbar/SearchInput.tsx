import { Card, Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Product from "../../entities/Product";
import useSearchProducts from "../../hooks/useSearchProducts";
import ProductCard from "../Product/ProductCard";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { data: searchResults } = useSearchProducts(ref.current?.value || "");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(ref.current?.value);
    searchResults;
    navigate("/search");
  };

  return (
    <>
      <form style={{ width: "40%" }} onSubmit={handleSubmit}>
        <InputGroup justifyContent={{ base: "center", md: "flex-center" }}>
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="Search products..."
            variant="filled"
            textAlign={{ base: "center", md: "left" }}
            maxWidth={{ base: "80%", md: "unset" }}
            mx={{ base: "auto", md: 0 }}
            fontSize={["sm", "md", "lg"]}
          />
        </InputGroup>
      </form>
      {searchResults && (
        <Card mt={4}>
          {searchResults.map((product: Product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </Card>
      )}
    </>
  );
};

export default SearchInput;
