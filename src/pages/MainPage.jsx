import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import AudioPlayer from '../components/AudioPlayer'
import Tracklist from '../components/Tracklist'
import NavMenu from '../components/NavMenu'
import Sidebar from '../components/Sidebar'
import { getTrackSrcURL } from '../api'


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


export const MainPage = () => {
  const [musicInfo, setMusicInfo] = useState({ isShown: false, isPlayed: false, src: "", trackName: "", authorName: "" });

  const onPlayAudio = (trackId) => {
    setMusicInfo({ isShown: true, isPlayed: false, src: "", trackName: "", authorName: "" });

    getTrackSrcURL(trackId).then((data) =>
    {
      console.log(data);

      setMusicInfo({ isShown: true, isPlayed: true, src: data.track_file, trackName: data.name, authorName: data.author  });
    }).catch((error) => {
        console.log(" - Error: Could not load a track");
      });
  }

	return (
		<React.Fragment>
			<MainBlock>
        <NavMenu/>
        <Tracklist onPlayAudio={ onPlayAudio } />
        <Sidebar/>
      </MainBlock>
      <AudioPlayer musicInfo={ musicInfo } />
		</React.Fragment>
	);
};
