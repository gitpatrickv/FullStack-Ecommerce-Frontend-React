import ShopList from "../../components/Shop/admin/ShopList";
import ShopListHeader from "../../components/Shop/admin/ShopListHeader";
import { useGetAllStore } from "../../hooks/admin/useGetAllStore";

const ShopListPage = () => {
  const { data: getAllStore } = useGetAllStore();

  return (
    <>
      <ShopListHeader />
      {getAllStore?.map((store) => (
        <ShopList key={store.storeId} store={store} />
      ))}
    </>
  );
};

export default ShopListPage;
