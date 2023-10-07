import styled from 'styled-components';


const FilterEl = styled.div`
	padding: 34px;

	position: absolute;
	top: 42px;
	z-index: 50;

	background-color: #313131;

	border-radius: 12px;
`;

const FilterList = styled.ul`
	max-height: 237px;

	overflow-y: auto;
`;

const FilterListElement = styled.li`
	margin-right: 24px;

	width: 100%;

	color: ${ props => (props.isChosen ? '#AD61FF' : `inherit`) };
	text-decoration: ${ props => (props.isChosen ? 'underline' : `none`) };
	
	&:not(:last-child) {
		margin-bottom: 28px;
	}

	&:hover {
		color: #D9B6FF;
	}

	&:active {
		color: #AD61FF;
	}
`;

const FilterListElementText = styled.a`
	width: 100%;

	font-size: 20px;
	font-weight: 400;
	line-height: 24px;
	white-space: nowrap;
`;


function Filter({ options, currOption, action, isMandatory }) {
	function onOptionPressed(event) {
		event.stopPropagation();
		
		const optionValue = event.currentTarget.getAttribute("option");

		if (isMandatory === true)
		{
			action(optionValue);
		}
		else
		{
			if (currOption === optionValue)
			{
				action(null);
			}
			else
			{
				action(optionValue);
			}
		}
	}

	return (
		<FilterEl>
			<FilterList>
				{
					options.map((option) => {
							return (
								<FilterListElement onClick={ onOptionPressed } option={ option } isChosen={ (option === currOption) ? true : false } >
									<FilterListElementText>{ option }</FilterListElementText>
								</FilterListElement>);
						})
				}
			</FilterList>
		</FilterEl>
	);
}

export default Filter;
