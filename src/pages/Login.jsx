import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';


const LoginDialog = styled.div`
	width: 340px;
	height: 420px;
`;


export const Login = ({ user, onLoginButtonClick }) => {
	return (
		<LoginDialog>
			<h1>Логин</h1>
			<input></input>
			<input></input>
			<button onClick={ onLoginButtonClick }>{ user ? "Вы уже здесь" : "Залогиниться!" }</button>
			<Link to="/register">Зарегистрироваться</Link>
		</LoginDialog>
	);
};