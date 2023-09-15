import React, { useContext, useState } from "react";


export const AuthContext = React.createContext();


export function useAuthContext() {
	return useContext(AuthContext);
}

export const AuthProvider = (props) => {
	const [user, setUser] = useState(null);

	const signIn = (userData) => {
		setUser(userData);
	}

	const signOut = () => {
		setUser(null);
	}

	return (
		<AuthContext.Provider value={ { userData: user, signIn, signOut } }>
			{ props.children }
		</AuthContext.Provider>);
}
