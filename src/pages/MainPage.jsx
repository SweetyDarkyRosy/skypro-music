import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import AudioPlayer from '../components/AudioPlayer'
import Tracklist from '../components/Tracklist'
import NavMenu from '../components/NavMenu'
import Sidebar from '../components/Sidebar'
import { getTrackSrcURL } from '../api';


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
  const audioPlayerComponentRef = useRef(null);

  const [musicInfo, setMusicInfo] = useState({ src: "", trackName: "", authorName: "", isReady: false });

  const [isAudioPlayerShown, setIfAudioPlayerShown] = useState(false);

  const onPlayAudio = (trackId) => {
    setIfAudioPlayerShown(true);

    getTrackSrcURL(trackId).then((data) =>
    {
      console.log(data);

      setMusicInfo({ src: data.track_file, trackName: data.name, authorName: data.author, isReady: true });
    }).catch((error) => {
        console.log(" - Error: Could not load a track");
      });
  }


  useEffect(() => {
      if (isAudioPlayerShown === true)
      {
        if (musicInfo.src !== "")
        {
          audioPlayerComponentRef.current.restartMusicPlaying(musicInfo.src);
        }
      }
    })


	return (
		<React.Fragment>
			<MainBlock>
        <NavMenu/>
        <Tracklist onPlayAudio={ onPlayAudio } />
        <Sidebar/>
      </MainBlock>
      {isAudioPlayerShown && (
        <AudioPlayer childRef={ audioPlayerComponentRef } musicInfo={ musicInfo } />
      )}
		</React.Fragment>
	);
};
