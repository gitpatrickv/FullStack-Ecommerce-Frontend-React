import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import useCreateStore, {
  CreateStoreProps,
} from "../../hooks/seller/useCreateStore";
import { useState } from "react";

const CreateStorePage = () => {
  const { onSubmit } = useCreateStore();
  const { register, handleSubmit } = useForm<CreateStoreProps>();
  const [loading, setLoading] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <FormControl>
          <FormLabel>Store Name</FormLabel>
          <Input
            disabled={loading}
            {...register("storeName")}
            type="text"
            borderColor="gray.500"
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Store Description</FormLabel>
          <Input
            disabled={loading}
            {...register("storeDescription")}
            type="text"
            borderColor="gray.500"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Address</FormLabel>
          <Input
            disabled={loading}
            {...register("address")}
            type="text"
            borderColor="gray.500"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Contact Number</FormLabel>
          <Input
            disabled={loading}
            {...register("contactNumber")}
            type="text"
            borderColor="gray.500"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Shipping Fee</FormLabel>
          <Input
            disabled={loading}
            {...register("shippingFee")}
            type="text"
            borderColor="gray.500"
          />
        </FormControl>

        <Button
          isLoading={loading}
          type="submit"
          _hover={{ color: "orange.400" }}
          mr="5px"
        >
          Save
        </Button>
      </Box>
    </form>
  );
};

export default CreateStorePage;
