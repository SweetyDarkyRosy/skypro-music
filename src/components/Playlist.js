import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';


const SidebarItem = styled.div`
  width: 250px;
  height: 150px;
`;

const sidebarLinkStyle = {
  width: "100%",
	height: "100%"
};

const SidebarBackground = styled.div`
  width: 100%;
	height: 100%;

  position: relative;
  z-index: 1;

  background: linear-gradient(127deg, #271A58, #7868CC);

  color: #FFFFFF;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 10;
  vertical-align: middle;

  &:hover {
    background: linear-gradient(127deg, #271A58, #271A58);
  }
`;


function Playlist({ categoryLabel, categoryId }) {
	return (
      <SidebarItem>
        <Link to={"/category/" + categoryId + "?categoryLabel=" + categoryLabel} style={ sidebarLinkStyle }>
          <SidebarBackground>{ categoryLabel }</SidebarBackground>
        </Link>
      </SidebarItem>
	);
}
	
export default Playlist;