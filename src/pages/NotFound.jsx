import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';


const NotFoundBlock = styled.div`
	height: 100vh;

	display: flex;

	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const NotFoundCode = styled.h1`
	margin: 0 auto;

	font-size: 160px;
	font-weight: 400;
	line-height: 168px;
`;

const NotFoundWarningBlock = styled.div`
	margin: 0 auto;

	display: flex;

	flex-direction: row;
	align-items: center;
	gap: 8px;
`;

const NotFoundText = styled.h2`
	display: inline-block;

	font-size: 32px;
	font-weight: 400;
	line-height: 40px;
`;

const NotFoundImg = styled.img`
	width: 52px;
	height: 52px;

	display: inline-block;
`;

const NotFoundDescription = styled.p`
	margin: 0 auto;

	width: 431px;

	color: #4E4E4E;

	font-size: 18px;
	font-weight: 400;
	line-height: 24px;
	text-align: center;
	letter-spacing: -0.3%;
`;

const BackButton = styled.div`
	margin-top: 36px;
	padding: 12px 46px 16px 46px;

	display: block;

	background-color: #580EA2;

	border-radius: 6px;

	&:hover {
		background-color: #3F007D;
	}

	&:active {
		background-color: #271A58;
	}
`;

const backButtonLink = {
	color: '#FFFFFF',
	fontWeight: '400',
	fontSize: '18px',
	lineHeight: '24px'};


export const NotFound = () => {
	return (
		<NotFoundBlock>
			<NotFoundCode>404</NotFoundCode>
			<NotFoundWarningBlock>
				<NotFoundText>Страница не найдена</NotFoundText>
				<NotFoundImg src="img/crying.png"/>
			</NotFoundWarningBlock>
			<NotFoundDescription>Возможно, она была удалена или перенесена на другой адрес</NotFoundDescription>
			<Link to={"/"} style={ backButtonLink }>
				<BackButton>
					Вернуться на главную
				</BackButton>
			</Link>
		</NotFoundBlock>
	);
};