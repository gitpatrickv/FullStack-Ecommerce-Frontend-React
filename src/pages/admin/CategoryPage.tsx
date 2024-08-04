import { Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import CategoryList from "../../components/Category/CategoryList";
import useGetAllCategory from "../../hooks/user/useGetAllCategory";
import CategoryListHeader from "../../components/Category/CategoryListHeader";

const CategoryPage = () => {
  const { data: category, refetch: refetchCategory } = useGetAllCategory();

  return (
    <Grid
      templateColumns="1fr  "
      templateAreas={`
    "content1"
    `}
    >
      <GridItem area="content1">
        <CategoryListHeader />
        <SimpleGrid columns={{ base: 5 }} spacing={2} minW="1000px">
          {category?.data.map((category) => (
            <CategoryList
              key={category.categoryId}
              category={category}
              onRefetchCategory={refetchCategory}
            />
          ))}
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export default CategoryPage;
