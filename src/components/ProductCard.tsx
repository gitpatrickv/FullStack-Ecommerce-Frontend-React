import { Card, CardBody, Image, Text } from "@chakra-ui/react";
import Product from "../entities/Product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card>
      <Image src={product.photoUrl} />
      <CardBody>
        <Text>{product?.productName}</Text>
        <Text>{product?.price}</Text>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
