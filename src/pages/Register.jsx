import React from "react";
import styled from 'styled-components';


const RegisterDialog = styled.div`
	width: 340px;
	height: 420px;
`;


export const Register = () => {
	return (
		<RegisterDialog>
			<h1>Регистрация</h1>
			<input></input>
			<input></input>
		</RegisterDialog>
	);
};