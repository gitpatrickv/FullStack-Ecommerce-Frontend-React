import { SimpleGrid, Text, Image } from "@chakra-ui/react";
import Product from "../entities/Product";

interface Props {
  product: Product;
}

const ProductDetail = ({ product }: Props) => {
  return (
    <SimpleGrid>
      <Image key={product.productId} src={product.photoUrl} />
      <Text>{product.productName}</Text>
    </SimpleGrid>
  );
};

export default ProductDetail;
