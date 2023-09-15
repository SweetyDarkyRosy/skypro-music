import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from '../authContext'

export const PrivateRoute = ({ redirectPath = "/login", isAllowed }) => {
	const authContext = useAuthContext();

	if (authContext.userData === null)
	{
		return <Navigate to={ redirectPath } replace={true} />
	}

	return <Outlet />
};
