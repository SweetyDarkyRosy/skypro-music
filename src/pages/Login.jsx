import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { logIn, getToken } from '../api'
import { useAuthContext } from '../authContext'


const LoginDialog = styled.div`
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

const LoginInput = styled.input`
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

const LoginDialogButton = styled.div`
	margin-top: 20px;
	padding: 12px 46px 16px 46px;

	width: 278px;

	display: block;

	border-radius: 6px;

	text-align: center;
`

const MainButton = styled(LoginDialogButton)`
	background-color: #580EA2;

	color: #FFFFFF;

	&:hover {
		background-color: #3F007D;
	}

	&:active {
		background-color: #271A58;
	}
`;

const SecondaryButton = styled(LoginDialogButton)`
	background-color: #transparent;
	border: 1px solid #D0CECE;

	color: #000000;

	&:hover {
		background-color: #F4F5F6;
	}

	&:active {
		background-color: #D0CECE;
	}
`;


export const Login = () => {
	const eMailInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const navigate = useNavigate();
	const authContext = useAuthContext();

	const onMainButtonClick = () => {
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
			<Logo className="logo">
				<LogoImg src="img/logo_modal.png" alt="logo"/>
			</Logo>
			<LoginInput ref={ eMailInputRef } placeholder="E-Mail" type="email"></LoginInput>
			<LoginInput ref={ passwordInputRef } placeholder="Password" type="password"></LoginInput>
			<MainButton onClick={ onMainButtonClick }>
				{ authContext.userData ? "Вы уже здесь" : "Войти" }
			</MainButton>
			<Link to="/register">
				<SecondaryButton>
					Зарегистрироваться
				</SecondaryButton>
			</Link>
		</LoginDialog>
	);
};