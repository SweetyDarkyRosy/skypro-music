import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Track from './Track';
import SearchBar from './SearchBar';
import { getFavouriteTrackList } from '../api'
import { setPreloadedPlaylist } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../authContext';


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


function TracklistFavourites() {
  const [isTrackListLoadingSuccessful, setTrackListLoadingSuccessStatus] = useState(true);
  const [isTrackListLoaded, setIfTrackListLoaded] = useState(false);

  const preloadedPlaylist = useSelector((state) => state.preloadedPlaylist);
  const dispatch = useDispatch();
  const authContext = useAuthContext();


  useEffect(() => {
    getFavouriteTrackList(authContext.accessToken.accessToken).then((data) =>
        {
          const trackListProcessed = [];

          data.forEach((track) => {
              const durationStr = (Math.floor(track.duration_in_seconds / 60)) + ":" + (track.duration_in_seconds % 60);
    
              const trackAdded = {
                trackId: track.id,
                trackName: track.name,
                authorName: track.author,
                albumName: track.author,
                isLiked: true,
                trackDuration: durationStr
              };
    
              trackListProcessed.push(trackAdded);
            });

            dispatch(setPreloadedPlaylist(trackListProcessed));

            setIfTrackListLoaded(true);
            setTrackListLoadingSuccessStatus(true);
        }).catch((error) => {
          console.error(" - Error: Could not get a list of favourite tracks");

            setTrackListLoadingSuccessStatus(false);
          });
    }, [])

	return (
		<TracklistEl className="centerblock">
      <SearchBar/>
      <TrackListSpecificH2>Мои треки</TrackListSpecificH2>
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
            preloadedPlaylist.map((track) => {
                return <Track trackId={ track.trackId } isTrackLoaded={ isTrackListLoaded } trackName={ track.trackName }
                  authorName={ track.authorName } albumName={ track.albumName } isLiked={ track.isLiked } trackTime={ track.trackDuration }/>;
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

export default TracklistFavourites;
