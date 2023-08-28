import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ redirectPath = "/login", isAllowed }) => {
	if (isAllowed === false)
	{
		return <Navigate to={ redirectPath } replace={true} />
	}

	return <Outlet />
};
