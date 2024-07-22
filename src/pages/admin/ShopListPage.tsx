import ShopList from "../../components/Shop/admin/ShopList";
import ShopListHeader from "../../components/Shop/admin/ShopListHeader";
import { useGetAllStore } from "../../hooks/admin/useGetAllStore";

const ShopListPage = () => {
  const { data: getAllStore, refetch: refetchStore } = useGetAllStore();

  return (
    <>
      <ShopListHeader />
      {getAllStore?.map((store) => (
        <ShopList
          key={store.storeId}
          store={store}
          onRefetchStore={refetchStore}
        />
      ))}
    </>
  );
};

export default ShopListPage;
