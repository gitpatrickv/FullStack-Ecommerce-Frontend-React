import {
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import useCreateStore, {
  CreateStoreProps,
} from "../../hooks/seller/useCreateStore";

const CreateStorePage = () => {
  const { onSubmit } = useCreateStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStoreProps>();
  const [loading, setLoading] = useState(false);

  return (
    <Grid
      templateColumns="0.2fr 1fr 0.2fr"
      templateAreas={`
      "asideLeft main asideRight"
    `}
    >
      <GridItem area="main">
        <Center mt="100px">
          <Stack spacing="5">
            <VStack as="header" spacing="6" mt="8">
              <Heading>Shop Information</Heading>
            </VStack>
            <Card
              variant="outline"
              borderColor="gray"
              w="500px"
              borderRadius="none"
            >
              <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <VStack spacing={4} mt="5px">
                    <FormControl>
                      <Input
                        disabled={loading}
                        {...register("storeName", {
                          required: "Store name is required",
                        })}
                        type="text"
                        placeholder="Shop Name"
                        borderColor="gray.500"
                      />
                      {errors.storeName && (
                        <Text color="red">{errors.storeName.message}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        {...register("storeDescription", {
                          required: "Store description is required",
                        })}
                        placeholder="Shop Description"
                        borderColor="gray.500"
                      />
                      {errors.storeDescription && (
                        <Text color="red">
                          {errors.storeDescription.message}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <Input
                        disabled={loading}
                        {...register("address", {
                          required: "Address is required",
                        })}
                        type="text"
                        placeholder="Shop Address"
                        borderColor="gray.500"
                      />
                      {errors.address && (
                        <Text color="red">{errors.address.message}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <Input
                        disabled={loading}
                        {...register("contactNumber", {
                          required: "Contact number is required",
                        })}
                        type="text"
                        placeholder="Shop Contact Number"
                        borderColor="gray.500"
                      />

                      {errors.contactNumber && (
                        <Text color="red">{errors.contactNumber.message}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <Input
                        disabled={loading}
                        {...register("shippingFee", {
                          required: "Shipping fee is required",
                        })}
                        type="text"
                        placeholder="Shop Shipping Fee"
                        borderColor="gray.500"
                      />
                      {errors.shippingFee && (
                        <Text color="red">{errors.shippingFee.message}</Text>
                      )}
                    </FormControl>
                    <Button
                      isLoading={loading}
                      type="submit"
                      _hover={{ color: "orange.400" }}
                      mr="5px"
                    >
                      Create Shop
                    </Button>
                  </VStack>
                </form>
              </CardBody>
            </Card>
          </Stack>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default CreateStorePage;
