import { Avatar, Box, Card, CardBody, Text } from "@chakra-ui/react";
import Category from "../../entities/Category";
import { useNavigate } from "react-router-dom";

interface Props {
  category: Category;
}

const CategoryCard = ({ category }: Props) => {
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/category/` + category.categoryId);
  };

  return (
    <Card maxW="150px" cursor="pointer" onClick={handleNavigateClick}>
      <CardBody>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            src={
              category.categoryPhotoUrl ||
              "https://st4.depositphotos.com/38069286/41918/v/450/depositphotos_419187960-stock-illustration-shopping-bag-icon-purchase-symbol.jpg"
            }
            size="lg"
          />
          <Text fontSize="small" whiteSpace="nowrap" mt="10px">
            {category.categoryName}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default CategoryCard;
