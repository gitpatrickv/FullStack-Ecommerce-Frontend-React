import { useAuthQueryStore } from "../../store/auth-store";
import Unauthorized from "./Unauthorized";

interface Props {
  children: React.ReactNode;
}

const UserSellerRoute = ({ children }: Props) => {
  const { authStore } = useAuthQueryStore();
  const role = authStore.role;
  return role === "SELLER" || role === "USER" ? (
    <>{children}</>
  ) : (
    <Unauthorized />
  );
};

export default UserSellerRoute;
