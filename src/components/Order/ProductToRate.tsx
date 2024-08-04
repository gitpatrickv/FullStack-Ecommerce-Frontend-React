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

import useGetProductsToRate from "../../hooks/user/useGetProductsToRate";
import Rate from "./Rate";
import RateStore from "./RateStore";

interface Props {
  orderId: string;
  storeRated: boolean;
}

const ProductToRate = ({ orderId, storeRated }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: getProductsToRate, refetch: refetchProductsToRate } =
    useGetProductsToRate(orderId);

  useEffect(() => {
    if (getProductsToRate?.length === 0 && storeRated === true) {
      onClose();
    }
  }, [getProductsToRate, onClose, storeRated]);

  return (
    <>
      {getProductsToRate?.length === 0 && storeRated === true ? (
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
              {storeRated === false && <RateStore orderId={orderId} />}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default ProductToRate;
