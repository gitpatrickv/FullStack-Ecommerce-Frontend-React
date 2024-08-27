import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { Box } from "@chakra-ui/react";
import useGetAllCategory from "../../hooks/user/useGetAllCategory";
import CategoryCard from "./CategoryCard";

const CategoryCarousel = () => {
  const { data: category } = useGetAllCategory();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    rows: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <Box maxWidth="1300px" padding={5} ml="30px">
      <Slider {...settings}>
        {category?.data.map((cat) => (
          <CategoryCard key={cat.categoryId} category={cat} />
        ))}
      </Slider>
    </Box>
  );
};

export default CategoryCarousel;
