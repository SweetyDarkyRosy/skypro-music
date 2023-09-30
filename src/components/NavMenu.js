import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const NavMenuEl = styled.nav`
  width: 244px;
	background-color: #181818;
	padding: 20px 0 20px 36px;
`;

const NavLogo = styled.div`
  width: 113.33px;
  height: 43px;
  padding: 13px 0 13px 0;
  background-color: transparent;
  margin-bottom: 20px;
`;

const LogoImg = styled.img`
  width: 113.33px;
  height: 17px;
  color: #181818;
`;

const Menu = styled.div`
  display: block;
	visibility: visible;
`;

const MenuList = styled.ul`
  padding: 18px 0 10px 0;
`;

const MenuItem = styled.li`
  padding: 5px 0;
  margin-bottom: 16px;
`;

const MenuLink = {
  color: '#ffffff',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '24px'
};

const NavBurger = styled.div`
  width: 20px;
  height: 36px;
  padding: 13px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;

  cursor: pointer;
`;

const BurgerLine = styled.span`
  display: inline-block;
	width: 100%;
	height: 1px;
	background-color: #d3d3d3;
`;


function NavMenu() {
  const [isMenuVisible, setMenuVisibility] = useState(true);

  const toggleMenuVisibility = () => setMenuVisibility(!isMenuVisible);


	return (
		<NavMenuEl className="nav">
      <NavLogo className="logo">
        <LogoImg src="img/logo.png" alt="logo"/>
      </NavLogo>
      <NavBurger className="burger" onClick={toggleMenuVisibility}>
        <BurgerLine></BurgerLine>
        <BurgerLine></BurgerLine>
        <BurgerLine></BurgerLine>
      </NavBurger>
      {isMenuVisible && (
        <Menu className="menu">
          <MenuList>
            <MenuItem>
              <Link to={"/"} style={MenuLink}>Главное</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/favorites"} style={MenuLink}>Мой плейлист</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/login"} style={MenuLink}>Войти</Link>
            </MenuItem>
          </MenuList>
        </Menu>)
      }
    </NavMenuEl>);
}
	
export default NavMenu;
	