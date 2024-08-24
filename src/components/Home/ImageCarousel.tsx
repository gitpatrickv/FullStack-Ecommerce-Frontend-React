import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const ImageCarousel = () => {
  const images = [
    "https://cf.shopee.ph/file/ph-11134258-7r98p-lxrz8u8sbsype5_xxhdpi",
    "https://cf.shopee.ph/file/ph-11134258-7r98p-lxtkkxytz0g4ef_xxhdpi",
    "https://cf.shopee.ph/file/ph-11134258-7r991-lxrpzqg0vfusfb_xxhdpi",
    "https://cf.shopee.ph/file/ph-11134258-7r98v-lxgcpk9d7thg39_xxhdpi",
    "https://cf.shopee.ph/file/ph-11134258-7r98u-lxtcd4f2aqdg55_xxhdpi",
    "https://cf.shopee.ph/file/ph-11134258-7r98s-lxt9y8269rvl2d_xxhdpi",
    "https://cf.shopee.ph/file/ph-11134258-7r992-lxhr3fpfdv5w9b_xxhdpi",
    "https://cf.shopee.ph/file/ph-11134258-7r98u-lxqbuunj2qu985_xxhdpi",
    "https://cf.shopee.ph/file/ph-11134258-7r98w-lxg6xvwhylfo20_xxhdpi",
    "https://cf.shopee.ph/file/ph-11134258-7r98t-lxqb3nudg1s473_xxhdpi",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    rows: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Grid
      templateColumns="0.7fr 0.3fr"
      templateAreas={`
    " content1 content2"
  `}
      padding={4}
      gap={2}
    >
      <GridItem area="content1">
        <Box maxWidth="900px" cursor="pointer">
          <Slider {...settings}>
            {images.map((image, index) => (
              <Box key={index}>
                <Image src={image} minWidth="900px" />
              </Box>
            ))}
          </Slider>
        </Box>
      </GridItem>
      <GridItem area="content2">
        <Box>
          <Image
            src="https://cf.shopee.ph/file/ph-11134258-7r98s-lxt6vst7n7r8b6_xhdpi"
            height="130px"
            minWidth="600px"
          />
          <Image
            src="https://cf.shopee.ph/file/ph-50009109-fe70ed2abeeaf4aa09f381bde1ecc1a9_xhdpi"
            height="130px"
            mt="10px"
            minWidth="600px"
          />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ImageCarousel;
