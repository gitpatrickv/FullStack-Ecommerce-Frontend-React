import { useAuthQueryStore } from "../../store/auth-store";
import Unauthorized from "./Unauthorized";

interface Props {
  children: React.ReactNode;
}

const SellerRoute = ({ children }: Props) => {
  const { authStore } = useAuthQueryStore();
  const role = authStore.role;
  return role === "SELLER" ? <>{children}</> : <Unauthorized />;
};

export default SellerRoute;
