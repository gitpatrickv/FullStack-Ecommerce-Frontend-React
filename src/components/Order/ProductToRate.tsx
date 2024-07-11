import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { useEffect } from "react";

import Rate from "./Rate";
import useGetProductsToRate from "../../hooks/user/useGetProductsToRate";

interface Props {
  orderId: string;
}

const ProductToRate = ({ orderId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: getProductsToRate, refetch: refetchProductsToRate } =
    useGetProductsToRate(orderId);
  useEffect(() => {
    if (getProductsToRate?.length === 0) {
      onClose();
    }
  }, [getProductsToRate, onClose]);

  return (
    <>
      {getProductsToRate?.length === 0 ? (
        ""
      ) : (
        <Button
          onClick={onOpen}
          bg="orange.500"
          _hover={{ bg: "orange.600" }}
          mr="10px"
          width="120px"
        >
          Rate
        </Button>
      )}

      <Box>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Rate Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {getProductsToRate?.map((order) => (
                <Rate
                  key={order.id}
                  order={order}
                  onRefetch={refetchProductsToRate}
                />
              ))}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default ProductToRate;
