import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Track from './Track';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { getTrackList } from '../api'
import { setPlaylist } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';


const TracklistEl = styled.div`
  width: auto;
	-webkit-box-flex: 3;
	-ms-flex-positive: 3;
	flex-grow: 3;
	padding: 20px 40px 20px 111px;
`;

const TrackListSpecificH2 = styled.h2`
  font-style: normal;
	font-weight: 400;
	font-size: 64px;
	line-height: 72px;
	letter-spacing: -0.8px;
	margin-bottom: 45px;
`;

const TracklistFilterBlock = styled.div`
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
	margin-bottom: 51px;
`;

const TracklistFilterBlockTitle = styled.div`
  font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	margin-right: 15px;
`;

const TracklistContent = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
`;

const TracklistContentTitleBlock = styled.div`
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
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	margin-bottom: 24px;
`;

const TracklistContentTitleBlockColumn = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 2px;
  color: #696969;
  text-transform: uppercase;
`;

const TracklistContentTitleBlockColumnTrack = styled(TracklistContentTitleBlockColumn)`
  width: 447px;
`;

const TracklistContentTitleBlockColumnAuthor = styled(TracklistContentTitleBlockColumn)`
  width: 321px;
`;

const TracklistContentTitleBlockColumnAlbum = styled(TracklistContentTitleBlockColumn)`
  width: 245px;
`;

const TracklistContentTitleBlockColumnTime = styled(TracklistContentTitleBlockColumn)`
  width: 60px;
	text-align: end;
`;

const TracklistContentTitleBlockSvg = styled.svg`
  width: 12px;
	height: 12px;
	fill: transparent;
	stroke: #696969;
`;

const TracklistContentPlaylist = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow-y: auto;
`;

const TracklistFilterButton = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;

  &:not(:last-child) {
    margin-right: 10px;
  }
`


function Tracklist() {
  const [isAuthorFilterVisible, setAuthorFilterLoadedState] = useState(false);

  const toggleAuthorFilterVisibility = () => setAuthorFilterLoadedState(!isAuthorFilterVisible);

  /*
  const [trackList, setTrackList] = useState([
      { trackName: "Track Name", authorName: "Author Name", albumName: "Album Name", trackDuration: "00:00" }
    ]);
  */

  const [isTrackListLoadingSuccessful, setTrackListLoadingSuccessStatus] = useState(true);
  const [isTrackListLoaded, setIfTrackListLoaded] = useState(false);

  const playlist = useSelector((state) => state.playlist);
  const dispatch = useDispatch();


  useEffect(()=>{
        getTrackList().then((data) =>
        {
          const trackListProcessed = [];

          data.forEach((track) => {
              const durationStr = (Math.floor(track.duration_in_seconds / 60)) + ":" + (track.duration_in_seconds % 60);

              const trackAdded = {
                trackId: track.id,
                trackName: track.name,
                authorName: track.author,
                albumName: track.author,
                trackDuration: durationStr
              };

              trackListProcessed.push(trackAdded);
            });

          //setTrackList(trackListProcessed);
          dispatch(setPlaylist(trackListProcessed));

          setIfTrackListLoaded(true);
          setTrackListLoadingSuccessStatus(true);
        }).catch((error) => {
            console.error(" - Error: Could not load a list of tracks available");

            setTrackListLoadingSuccessStatus(false);
          });
    }, [])

	return (
		<TracklistEl className="centerblock">
      <SearchBar/>
      <TrackListSpecificH2>Треки</TrackListSpecificH2>
      <TracklistFilterBlock className="filter">
        <TracklistFilterBlockTitle>Искать по:</TracklistFilterBlockTitle>
        <TracklistFilterButton className="button-author _btn-text" onClick={toggleAuthorFilterVisibility}>
          исполнителю

        {isAuthorFilterVisible && (
          <Filter/>
        )}
        </TracklistFilterButton>
        <TracklistFilterButton className="button-year _btn-text">
          году выпуска
        </TracklistFilterButton>
        <TracklistFilterButton className="button-genre _btn-text">
          жанру
        </TracklistFilterButton>
      </TracklistFilterBlock>
      {isTrackListLoadingSuccessful && (
        <TracklistContent>
          <TracklistContentTitleBlock className="playlist-title">
            <TracklistContentTitleBlockColumnTrack>Трек</TracklistContentTitleBlockColumnTrack>
            <TracklistContentTitleBlockColumnAuthor>ИСПОЛНИТЕЛЬ</TracklistContentTitleBlockColumnAuthor>
            <TracklistContentTitleBlockColumnAlbum>АЛЬБОМ</TracklistContentTitleBlockColumnAlbum>
            <TracklistContentTitleBlockColumnTime>
              <TracklistContentTitleBlockSvg alt="time">
                <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
              </TracklistContentTitleBlockSvg>
            </TracklistContentTitleBlockColumnTime>
          </TracklistContentTitleBlock>
          <TracklistContentPlaylist className="playlist">
          {
            /*
            trackList.map((track) => {
                return <Track trackId={ track.trackId } onPlayAudio={ onPlayAudio } isTrackLoaded={ isTrackListLoaded } trackName={ track.trackName }
                  authorName={ track.authorName } albumName={ track.albumName } trackTime={ track.trackDuration }/>;
              })
            */

            playlist.map((track) => {
                return <Track trackId={ track.trackId } isTrackLoaded={ isTrackListLoaded } trackName={ track.trackName }
                  authorName={ track.authorName } albumName={ track.albumName } trackTime={ track.trackDuration }/>;
              })
          }
          </TracklistContentPlaylist>
        </TracklistContent>
      )}
      {!isTrackListLoadingSuccessful && (
        <p>Не удалось загрузить плейлист, попробуйте позже</p>
      )}
    </TracklistEl>
	);
}

export default Tracklist;
