import { Card, CardBody, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Product from "../entities/Product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link to={`api/product/` + product.productId}>
      <Card>
        <Image src={product.photoUrl} />
        <CardBody>
          <Text>{product?.productName}</Text>
          <Text>{product?.price}</Text>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ProductCard;
