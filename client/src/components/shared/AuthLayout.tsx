import { Navigate, Outlet } from "react-router-dom";
import { paths } from "@/constants/paths";
import { useAppSelector } from "@/hooks/redux";
import { selectAuth } from "@/store/auth";
import { Spinner } from "./Spinner";

const AuthLayout = () => {

  const {user, loading} = useAppSelector(selectAuth)

  if (loading) {
    return (
      <div className="flex flex-col gap-3 w-full items-center mt-28">
        <Spinner/>
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
        <Navigate to={paths.HOME} />
    );
  }

  return <Outlet />;
};

export default AuthLayout;
