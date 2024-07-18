import { Avatar, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Category from "../../entities/Category";

interface Props {
  category: Category;
}

const CategoryCard = ({ category }: Props) => {
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/category/` + category.categoryId);
  };

  return (
    <Box
      maxW="150px"
      height="150px"
      cursor="pointer"
      border="1px solid"
      onClick={handleNavigateClick}
      borderColor="gray.500"
      _hover={{
        color: "orange.500",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt="20px"
      >
        <Avatar
          src={
            category.categoryPhotoUrl ||
            "https://st4.depositphotos.com/38069286/41918/v/450/depositphotos_419187960-stock-illustration-shopping-bag-icon-purchase-symbol.jpg"
          }
          size="lg"
        />
        <Text fontSize="14px" mt="10px" textAlign="center">
          {category.categoryName}
        </Text>
      </Box>
    </Box>
  );
};

export default CategoryCard;
