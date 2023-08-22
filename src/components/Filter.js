import styled from 'styled-components';


const FilterEl = styled.div`
	padding: 34px;

	float: left;
	position: absolute;
	

	z-index: 50;

	top: 288px;

	background-color: #313131;

	border-radius: 12px;
`;

const FilterList = styled.ul`
	max-height: 237px;

	overflow-y: auto;
`;

const FilterListElement = styled.li`
	margin-right: 24px;
	
	&:not(:last-child) {
		margin-bottom: 28px;
	}

	width: 100%;
`;

const FilterListElementText = styled.a`
	width: 100%;

	font-size: 20px;
	font-weight: 400;
	line-height: 24px;
	white-space: nowrap;
`;


function Filter() {
	return (
		<FilterEl>
			<FilterList>
				<FilterListElement>
					<FilterListElementText>Michael Jackson</FilterListElementText>
				</FilterListElement>
				<FilterListElement>
					<FilterListElementText>Frank Sinatra</FilterListElementText>
				</FilterListElement>
				<FilterListElement>
					<FilterListElementText>Calvin Harris</FilterListElementText>
				</FilterListElement>
				<FilterListElement>
					<FilterListElementText>Zhu</FilterListElementText>
				</FilterListElement>
				<FilterListElement>
					<FilterListElementText>Arctic Monkeys</FilterListElementText>
				</FilterListElement>
				<FilterListElement>
					<FilterListElementText>Arctic Monkeys</FilterListElementText>
				</FilterListElement>
				<FilterListElement>
					<FilterListElementText>Arctic Monkeys</FilterListElementText>
				</FilterListElement>
				<FilterListElement>
					<FilterListElementText>Arctic Monkeys</FilterListElementText>
				</FilterListElement>
			</FilterList>
		</FilterEl>
	);
}

export default Filter;
