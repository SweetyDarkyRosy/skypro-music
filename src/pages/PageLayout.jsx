import React from 'react';
import styled from 'styled-components';
import AudioPlayer from '../components/AudioPlayer'
import NavMenu from '../components/NavMenu'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';


const MainBlock = styled.main`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  -ms-flex-wrap: wrap;
  flex-wrap: wrap;

  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;

  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
`


export const PageLayout = () => {
  const currentTrack = useSelector((state) => state.currentTrack);


	return (
		<React.Fragment>
			<MainBlock>
        <NavMenu/>
        <Outlet/>
      </MainBlock>
      {currentTrack && (
        <AudioPlayer/>
      )}
		</React.Fragment>
	);
};
