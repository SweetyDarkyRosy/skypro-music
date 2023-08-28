import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';


const CategoryBlock = styled.div`
	height: 100vh;

	display: flex;

	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const CategoryText = styled.h1`
	margin: 0 auto;

	font-size: 46px;
`;


export const Category = () => {
	const pageParams = useParams();

	return (
		<CategoryBlock>
			<CategoryText>Category #{ pageParams.id }</CategoryText>
			<Link to="/">Вернуться на главную страницу</Link>
		</CategoryBlock>
	);
};