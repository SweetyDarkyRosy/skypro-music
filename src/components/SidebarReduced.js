import styled from 'styled-components';
import { useAuthContext } from '../authContext'


const SidebarEl = styled.div`
  max-width: 418px;
	padding: 20px 90px 20px 78px;
`;

const SidebarPersonal = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 12px 0 15px 0;
`;

const SidebarPersonalName = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-right: 16px;
`;

const SidebarIcon = styled.div`
  width: 43px;
  height: 43px;
  background-color: #313131;
  border-radius: 50%;
  cursor: pointer;
`;


function SidebarReduced() {
  const authContext = useAuthContext();

  const logOut = () => {
    authContext.signOut();
  }

	return (
		<SidebarEl className="sidebar">
      <SidebarPersonal>
        <SidebarPersonalName>{ authContext.userData.username }</SidebarPersonalName>
        <SidebarIcon onClick={ logOut }>
          <svg alt="logout">
            <use xlinkHref="img/icon/sprite.svg#logout"></use>
          </svg>
        </SidebarIcon>
      </SidebarPersonal>
    </SidebarEl>
	);
}
	
export default SidebarReduced;
	