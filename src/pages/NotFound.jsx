import React from "react";
import styled from 'styled-components';


const NotFoundBlock = styled.div`
	height: 100vh;

	display: flex;

	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const NotFoundText = styled.h1`
	margin: 0 auto;

	font-size: 46px;
`;


export const NotFound = () => {
	return (
		<NotFoundBlock>
			<NotFoundText>Page has not been found...</NotFoundText>
		</NotFoundBlock>
	);
};