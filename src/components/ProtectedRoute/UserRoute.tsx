import { useAuthQueryStore } from "../../store/auth-store";
import Unauthorized from "./Unauthorized";

interface Props {
  children: React.ReactNode;
}

const UserRoute = ({ children }: Props) => {
  const { authStore } = useAuthQueryStore();
  const role = authStore.role;

  return role === "USER" || role === "SELLER" ? (
    <>{children}</>
  ) : (
    <Unauthorized />
  );
};

export default UserRoute;
