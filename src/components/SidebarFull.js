import Playlist from './Playlist';
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

const SidebarList = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  gap: 30px;
`;

const SidebarBlock = styled.div`
  height: 100%;
  padding: 240px 0 0 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
`;


function SidebarFull() {
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
      <SidebarBlock>
        <SidebarList>
          <Playlist imageSrcPath="img/playlist01.png" categoryId="1"/>
          <Playlist imageSrcPath="img/playlist02.png" categoryId="2"/>
          <Playlist imageSrcPath="img/playlist03.png" categoryId="3"/>
        </SidebarList>
      </SidebarBlock>
    </SidebarEl>
	);
}
	
export default SidebarFull;
	