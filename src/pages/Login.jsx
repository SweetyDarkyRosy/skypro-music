import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { logIn, getToken } from '../api'
import { useAuthContext } from '../authContext'


const LoginDialog = styled.div`
	width: 340px;
	height: 420px;
`;


export const Login = ({ user, setUser }) => {
	const eMailInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const navigate = useNavigate();
	const authContext = useAuthContext();

	const onLoginButtonClick = () => {
		logIn({ email: eMailInputRef.current.value, password: passwordInputRef.current.value }).then((logInResult) =>
			{
				switch (logInResult.status)
				{
					case 400:
					{
						console.error(" - Error: Could not log in because of non-compliance with the requirements");
						break;
					}

					case 500:
					{
						console.error(" - Error: Could not send a request because of a server failure");
						break;
					}

					case 401:
					{
						console.error(" - Error: There is no user with such e-mail and password");
						break;
					}

					default:
					{
						getToken({ email: eMailInputRef.current.value, password: passwordInputRef.current.value }).then((getTokenResult) => {
								switch (getTokenResult.status)
								{
									case 400:
									{
										console.error(" - Error: Could not obtain a new token because of non-compliance with the requirements");
										break;
									}

									case 500:
									{
										console.error(" - Error: Could not send a request because of a server failure");
										break;
									}

									case 401:
									{
										console.error(" - Error: There is no user with such e-mail and password");
										break;
									}

									default:
									{
										authContext.signIn(
											{
												userId: logInResult.data.id,
												username: logInResult.data.username,
												eMail: logInResult.data.email,
												refreshToken: getTokenResult.data.refresh,
												accessToken: getTokenResult.data.access
											});

										navigate("/", { replace: true });
									}
								}
							}).catch((error) => {
									console.error(" - Error: Could not obtain a token");
								});
					}
				}
			}).catch((error) => {
					console.error(" - Error: Could not log in");
				});
	}

	return (
		<LoginDialog>
			<h1>Логин</h1>
			<input ref={ eMailInputRef } placeholder="E-Mail" type="email"></input>
			<input ref={ passwordInputRef } placeholder="Password" type="password"></input>
			<button onClick={ onLoginButtonClick }>{ authContext.userData ? "Вы уже здесь" : "Залогиниться!" }</button>
			<Link to="/register">Зарегистрироваться</Link>
		</LoginDialog>
	);
};