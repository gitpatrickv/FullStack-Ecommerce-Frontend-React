import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  productImage: string[];
}

const ProductImages = ({ productImage }: Props) => {
  const [images, setImages] = useState(productImage);

  const [activeImage, setActiveImage] = useState(images[0]);
  return (
    <Grid
      templateColumns="1fr"
      templateAreas={`
    "content1 "
  `}
    >
      <GridItem area="content1">
        <Box>
          <Image
            src={activeImage}
            maxWidth="91%"
            minWidth="91%"
            h="400"
            objectFit="cover"
          />
          <Box display="flex" mt="10px">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                w="24"
                h="24"
                cursor="pointer"
                _hover={{
                  transform: "scale(1.03)",
                  transition: "transform .15s ease-in",
                  border: "2px solid orange",
                }}
                onMouseEnter={() => setActiveImage(image)}
                mr="5px"
              />
            ))}
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default ProductImages;
