import { Route, Routes } from "react-router-dom";
import { PageLayout } from './pages/PageLayout'
import { MainPage } from './pages/MainPage'
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Category } from "./pages/Category";
import { Favorites } from "./pages/Favorites";
import { PrivateRoute } from "./components/PrivateRoute";


export const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<PrivateRoute />}>
				<Route path="/" element={<PageLayout />}>
					<Route path="" element={<MainPage />}/>
					<Route path="category/:id" element={<Category />}/>
					<Route path="favorites" element={<Favorites />}/>
				</Route>
			</Route>
			
			<Route path="/login" element={<Login />}/>
			<Route path="/register" element={<Register />}/>

			<Route path="*" element={<NotFound />}/>
		</Routes>
	);
};
