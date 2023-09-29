import React, { useContext, useEffect, useState } from "react";
import { refreshToken } from './api'


export const AuthContext = React.createContext();
let refreshTtokenIntervalID = null;


export function useAuthContext() {
	return useContext(AuthContext);
}


export const AuthProvider = (props) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);


	const signIn = (userData) => {
		setUser({ userId: userData.userId, username: userData.username, eMail: userData.eMail });
		setToken({ refreshToken: userData.refreshToken, accessToken: userData.accessToken });
	}

	const signOut = () => {
		setUser(null);
		setToken(null);
	}

	useEffect(() => {
			const refreshTokenLocal = () => {
				refreshToken({ refreshToken: token.refreshToken }).then((result) => {
						switch (result.status)
						{
							case 400:
							{
								console.error(" - Error: Refresh token was not sent");
								break;
							}

							case 500:
							{
								console.error(" - Error: Could not send a request because of a server failure");
								break;
							}

							case 401:
							{
								console.error(" - Error: Refresh token is invalid");
								break;
							}

							default:
							{
								setToken({ refreshToken: token.refreshToken, accessToken: result.data.access });
							}
						}
					}).catch((error) => {
							console.error(" - Error: Could not refresh the token");
						});
			};

			if (user != null)
			{
				refreshTtokenIntervalID = setInterval(refreshTokenLocal, 200000);
			}
			else
			{
				clearInterval(refreshTtokenIntervalID);
				refreshTtokenIntervalID = null;
			}

			return function() {
				clearInterval(refreshTtokenIntervalID);
				refreshTtokenIntervalID = null;
			}
		}, [user]);

	return (
		<AuthContext.Provider value={ { userData: user, accessToken: token, signIn, signOut } }>
			{ props.children }
		</AuthContext.Provider>);
}
