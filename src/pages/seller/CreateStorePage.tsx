import {
  Button,
  Card,
  CardBody,
  Center,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
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
  const { register, handleSubmit } = useForm<CreateStoreProps>();
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
              <Heading>Store Information</Heading>
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
                    <Input
                      disabled={loading}
                      {...register("storeName")}
                      type="text"
                      placeholder="Store Name"
                      borderColor="gray.500"
                    />

                    <Textarea
                      disabled={loading}
                      {...register("storeDescription")}
                      placeholder="Store Description"
                      borderColor="gray.500"
                    />

                    <Input
                      disabled={loading}
                      {...register("address")}
                      type="text"
                      placeholder="Store Address"
                      borderColor="gray.500"
                    />

                    <Input
                      disabled={loading}
                      {...register("contactNumber")}
                      type="text"
                      placeholder="Store Contact Number"
                      borderColor="gray.500"
                    />

                    <Input
                      disabled={loading}
                      {...register("shippingFee")}
                      type="text"
                      placeholder="Store Shipping Fee"
                      borderColor="gray.500"
                    />

                    <Button
                      isLoading={loading}
                      type="submit"
                      _hover={{ color: "orange.400" }}
                      mr="5px"
                    >
                      Create Store
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
