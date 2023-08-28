import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';


const FavoritesBlock = styled.div`
	height: 100vh;

	display: flex;

	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const FavoritesText = styled.h1`
	margin: 0 auto;

	font-size: 46px;
`;


export const Favorites = () => {
	return (
		<FavoritesBlock>
			<FavoritesText>Самые любимые песенки</FavoritesText>
			<Link to="/">Вернуться на главную страницу</Link>
		</FavoritesBlock>
	);
};