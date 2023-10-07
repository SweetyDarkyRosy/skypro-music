import React, { useRef } from "react";
import styled from 'styled-components';
import { registerNewUser } from '../api'
import { useNavigate } from "react-router-dom";

const RegisterDialog = styled.div`
	margin: 0 auto;
	padding: 43px 47px 47px 47px;

	width: 366px;
	height: 439px;

	display: flex;
	flex-direction: column;
	align-items: center;

	position: relative;
	top: calc((100% - 439px) / 2);

	border-radius: 12px;

	background-color: #FFFFFF;
`;

const Logo = styled.div`
	margin-bottom: 42px;
	padding: 13px 0 13px 0;

	width: 113.33px;
	height: 43px;

	
	background-color: transparent;
	margin-bottom: 20px;
`;

const LogoImg = styled.img`
	width: 113.33px;
	height: 17px;
	color: #181818;
`;

const RegisterInput = styled.input`
	margin-bottom: 38px;
	padding: 8px 0;

	width: 278.5px;

	background-color: transparent;
	border: none;
	border-bottom: 1px solid #D0CECE;

	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	line-height: 24px;
	color: #000000;

	&::-webkit-input-placeholder {
		background-color: transparent;
		color: #D0CECE;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
	}

	&:-ms-input-placeholder {
		background-color: transparent;
		color: #D0CECE;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
	}

	&:-moz-placeholder {
		background-color: transparent;
		color: #D0CECE;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
	}
	
	&::placeholder {
		background-color: transparent;
		color: #D0CECE;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
	}
`;

const RegisterDialogButton = styled.div`
	margin-top: 20px;
	padding: 12px 46px 16px 46px;

	width: 278px;

	display: block;

	border-radius: 6px;

	text-align: center;
`

const MainButton = styled(RegisterDialogButton)`
	background-color: #580EA2;

	color: #FFFFFF;

	&:hover {
		background-color: #3F007D;
	}

	&:active {
		background-color: #271A58;
	}
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
			<Logo className="logo">
				<LogoImg src="img/logo_modal.png" alt="logo"/>
			</Logo>
			<RegisterInput ref={ usernameInputRef } placeholder="Username"></RegisterInput>
			<RegisterInput ref={ eMailInputRef } placeholder="E-Mail" type="email"></RegisterInput>
			<RegisterInput ref={ passwordInputRef } placeholder="Password" type="password"></RegisterInput>
			<MainButton onClick={ onRegisterButtonClick }>Зарегистрироваться</MainButton>
		</RegisterDialog>
	);
};