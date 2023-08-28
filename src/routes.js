import { Route, Routes } from "react-router-dom";
import { MainPage } from './pages/MainPage'
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Category } from "./pages/Category";
import { Favorites } from "./pages/Favorites";
import { PrivateRoute } from "./components/PrivateRoute";


export const AppRoutes = ({ user, onLoginButtonClick }) => {
	return (
		<Routes>
			<Route element={<PrivateRoute isAllowed={ Boolean(user) } />}>
				<Route path="/" element={<MainPage />}/>
				<Route path="/category/:id" element={<Category />}/>
				<Route path="/favorites" element={<Favorites />}/>
			</Route>
			
			<Route path="/login" user={ user } onLoginButtonClick={ onLoginButtonClick } element={<Login />}/>
			<Route path="/register" element={<Register />}/>

			<Route path="*" element={<NotFound />}/>
		</Routes>
	);
};
