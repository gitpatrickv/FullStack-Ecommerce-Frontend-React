import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  Select,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { IoMdImages } from "react-icons/io";
import useSaveProduct from "../../hooks/seller/useSaveProduct";
import useGetAllCategory from "../../hooks/user/useGetAllCategory";

const NewProductPage = () => {
  const { onSubmit, register, handleSubmit, control, errors } =
    useSaveProduct();
  const [isVariation, setIsVariation] = useState<boolean>(false);
  const [isColorsAndSizes, setIsColorsAndSizes] = useState<boolean>(false);

  const { data: category } = useGetAllCategory();
  const colors = [
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Orange",
    "Purple",
    "Pink",
    "Black",
    "White",
    "Gray",
    "Brown",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const {
    fields: variationFields,
    append: appendVariation,
    remove: removeVariation,
  } = useFieldArray({
    control,
    name: "inventoryModels",
  });

  const handleEnableVariationCheckBoxChange = () => {
    const variation = !isVariation;
    setIsVariation(variation);
    if (variation) {
      removeVariation();
    }
  };

  return (
    <Card borderRadius="none">
      <Grid
        templateAreas={{
          base: `"main"`,
        }}
        templateColumns={{
          base: "1000px",
          lg: " 1fr",
        }}
      >
        <GridItem area="main" padding={5}>
          <Text fontSize="lg" fontWeight="semibold">
            Create New Product
          </Text>
          <Box p={4}>
            <Text mb="5px" fontSize="large" fontWeight="semibold">
              Category
            </Text>
            <Select
              maxWidth="30%"
              {...register("categoryId", { required: true })}
            >
              {category?.data.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
            </Select>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Text mb="5px" fontSize="large" fontWeight="semibold" mt="10px">
                Product Name
              </Text>
              <Input
                {...register("productName", { required: true })}
                placeholder="Product Name"
              />
              <Text mb="5px" mt="10px" fontSize="large" fontWeight="semibold">
                Product Description
              </Text>
              <Textarea
                {...register("productDescription", { required: true })}
                placeholder="Product Description"
              />

              <Box display="flex" mt="20px" alignItems="center" mr="10px">
                <Checkbox
                  size="lg"
                  colorScheme="green"
                  isChecked={isVariation}
                  onChange={handleEnableVariationCheckBoxChange}
                />
                <Text fontSize="large" ml="5px" color="white.500">
                  Enable Variation
                </Text>
              </Box>
              {isVariation ? (
                <>
                  {variationFields.length === 0 ? (
                    ""
                  ) : (
                    <>
                      <Box display="flex" mt="10px" alignItems="center">
                        <Checkbox
                          size="lg"
                          colorScheme="green"
                          isChecked={isColorsAndSizes}
                          onChange={() =>
                            setIsColorsAndSizes(!isColorsAndSizes)
                          }
                        />
                        <Text fontSize="large" ml="5px" color="white.500">
                          Colors and Sizes
                        </Text>
                      </Box>
                      <Box
                        display="flex"
                        textAlign="center"
                        mt="10px"
                        mb="10px"
                      >
                        <Text fontSize="large">Variation</Text>
                        <Spacer />
                        <Text fontSize="large" mr="20px">
                          Size
                        </Text>
                        <Spacer />
                        <Text fontSize="large" mr="30px" ml="15px">
                          Price
                        </Text>
                        <Spacer />
                        <Text fontSize="large" mr="35px">
                          Quantity
                        </Text>
                        <Spacer />
                      </Box>
                    </>
                  )}

                  {variationFields.map((field, index) => (
                    <HStack key={field.id} spacing={4} mb="10px">
                      {isColorsAndSizes ? (
                        <>
                          <Select
                            {...register(`inventoryModels.${index}.colors`)}
                          >
                            {colors.map((value, index) => (
                              <option key={index} value={value}>
                                {value}
                              </option>
                            ))}
                          </Select>
                          <Select
                            {...register(`inventoryModels.${index}.sizes`)}
                          >
                            {sizes.map((value, index) => (
                              <option key={index} value={value}>
                                {value}
                              </option>
                            ))}
                          </Select>
                        </>
                      ) : (
                        <>
                          <Input
                            placeholder="Variation"
                            {...register(`inventoryModels.${index}.colors`)}
                          />
                          <Input
                            placeholder="Size"
                            {...register(`inventoryModels.${index}.sizes`)}
                          />
                        </>
                      )}

                      <Input
                        type="number"
                        placeholder="Price"
                        {...register(`inventoryModels.${index}.price`, {
                          required: true,
                        })}
                      />
                      <Input
                        type="number"
                        placeholder="Quantity"
                        {...register(`inventoryModels.${index}.quantity`, {
                          required: true,
                        })}
                      />
                      <IconButton
                        aria-label="Remove variation"
                        icon={<DeleteIcon />}
                        onClick={() => removeVariation(index)}
                      />
                    </HStack>
                  ))}
                  <Button
                    mt="15px"
                    leftIcon={<AddIcon />}
                    _hover={{ color: "orange.400" }}
                    onClick={() =>
                      appendVariation({
                        sizes: "",
                        colors: "",
                        price: 0,
                        quantity: 0,
                      })
                    }
                  >
                    Add Variation
                  </Button>
                </>
              ) : (
                <>
                  <Box mt="10px">
                    <Text fontSize="large" mb="5px">
                      Price
                    </Text>
                    <Input
                      maxWidth="20%"
                      mb="10px"
                      type="number"
                      placeholder="Price"
                      {...register(`inventoryModels.0.price`, {
                        required: true,
                      })}
                    />
                    <Text fontSize="large" mb="5px">
                      Quantity
                    </Text>
                    <Input
                      maxWidth="20%"
                      mb="10px"
                      type="number"
                      placeholder="Quantity"
                      {...register(`inventoryModels.0.quantity`, {
                        required: true,
                      })}
                    />
                  </Box>
                </>
              )}
              <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" mb="15px" mt="20px">
                  <IoMdImages size="30px" />
                  <Text ml="10px">Upload Product Images (Max Limit: 6)</Text>
                </Box>
                <input
                  type="file"
                  accept=".jpeg, .png"
                  multiple
                  {...register("file", {
                    required: true,
                    validate: {
                      maxFiles: (files) =>
                        files.length <= 6 ||
                        "You can only upload a maximum of 6 images.",
                    },
                  })}
                />
                {errors.file && <Text color="red">{errors.file.message}</Text>}
                <Button
                  type="submit"
                  mt="20px"
                  bg="orange.400"
                  _hover={{ bg: "orange.500" }}
                  _active={{ bg: "orange.600" }}
                >
                  Save Product
                </Button>
              </Box>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default NewProductPage;
