import React, { useRef } from "react";
import styled from 'styled-components';
import { registerNewUser } from '../api'
import { useNavigate } from "react-router-dom";


const RegisterDialog = styled.div`
	width: 340px;
	height: 420px;
`;


export const Register = () => {
	const usernameInputRef = useRef(null);
	const eMailInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const navigate = useNavigate();
	

	const onRegisterButtonClick = () => {
		registerNewUser({ username: usernameInputRef.current.value, password: passwordInputRef.current.value,
			email: eMailInputRef.current.value }).then((result) =>
			{
				switch (result.status)
				{
					case 400:
					{
						console.log(" - Error: Could not register a new user because of non-compliance with the requirements");
						break;
					}

					case 500:
					{
						console.log(" - Error: Could not send a request because of a server failure");
						break;
					}

					default:
					{
						navigate("/login", { replace: true });
					}
				}
			}).catch((error) => {
					console.log(" - Error: Could not register a new user");
				});
	}

	return (
		<RegisterDialog>
			<h1>Регистрация</h1>
			<input ref={ usernameInputRef } placeholder="Username"></input>
			<input ref={ eMailInputRef } placeholder="E-Mail" type="email"></input>
			<input ref={ passwordInputRef } placeholder="Password" type="password"></input>
			<button onClick={ onRegisterButtonClick }>Зарегистрироваться</button>
		</RegisterDialog>
	);
};