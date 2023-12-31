import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCurrTrack, setCurrentPlaylist, setIfCurrTrackIsLiked } from '../store/actions'
import { useAuthContext } from '../authContext';
import { addFavouriteTrack, deleteFavouriteTrack } from '../api'


const PlaylistItem = styled.div`
  width: 100%;
  display: block;
  margin-bottom: 12px;
`;

const PlaylistTrack = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  &:hover {
    background: #222222;
  }
`;

const TrackTitle = styled.div`
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
	width: 447px;
`;

const TrackTitleImg = styled.div`
  width: 51px;
	height: 51px;
	padding: 16px;
	background: #313131;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	margin-right: 17px;
`;

const TrackTitleSvg = styled.svg`
  width: 18px;
	height: 17px;
	fill: transparent;
	stroke: #4e4e4e;
`;

const TrackTitleLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

const TrackTitleSpan = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4e4e4e;
`;

const TrackAuthor = styled.div`
  width: 321px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: start;
	-ms-flex-pack: start;
	justify-content: flex-start;
`;

const TrackAuthorLink = styled.a`
  font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	color: #ffffff;
	text-align: left;
`;

const TrackAlbum = styled.div`
  width: 245px;
`;

const TrackAlbumLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #696969;
`;

const TrackTimeSvg = styled.svg`
  width: 14px;
  height: 12px;
  margin-right: 17px;

  cursor: pointer;

  fill: ${ props => (props.isLiked ? '#B672FF' : `transparent`) };
  stroke: ${ props => (props.isLiked ? '#B672FF' : `#696969`) };

  &:hover {
    stroke: #ACACAC;
  }

  &:active {
    stroke: #FFFFFF;
  }
`;

const TrackTimeText = styled.span`
  font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	text-align: right;
	color: #696969;
`;


function Track(props) {
  const dispatch = useDispatch();
  const authContext = useAuthContext();
  const preloadedPlaylist = useSelector((state) => state.preloadedPlaylist);
  const currTrack = useSelector((state) => state.currentTrack);

  const [isLiked, setIfLiked] = useState(false);


  const playTrack = (event) => {
    event.preventDefault();

    dispatch(setCurrentPlaylist(preloadedPlaylist));
    dispatch(setCurrTrack(props.trackId, isLiked));
  }

  const onLikeClick = (event) => {
    event.preventDefault();

    async function updateCurrTrackLikedState(isLiked) {
      dispatch(setIfCurrTrackIsLiked(isLiked));
    }

    if (isLiked === true)
    {
      deleteFavouriteTrack(props.trackId, authContext.accessToken.accessToken).then(() =>
        {
          setIfLiked(false);

          if (currTrack.id === props.trackId)
          {
            updateCurrTrackLikedState(false);
          }
        }).catch((error) => {
            console.error(" - Error: Could not delete track from the favourites");
          });
    }
    else
    {
      addFavouriteTrack(props.trackId, authContext.accessToken.accessToken).then(() =>
        {
          setIfLiked(true);

          if (currTrack.id === props.trackId)
          {
            updateCurrTrackLikedState(true);
          }
        }).catch((error) => {
            console.error(" - Error: Could not add the track to the favourites");
          });
    }
  }
  
  useEffect(() => {
      setIfLiked(props.isLiked);
    }, [props.isLiked]);

	return (
		<PlaylistItem>
      <PlaylistTrack className="track">
        <TrackTitle onClick={playTrack}>
          <TrackTitleImg>
          {(props.isTrackLoaded) ? (
            <TrackTitleSvg alt="music">
              <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
            </TrackTitleSvg>
          ) : (
            <SkeletonTheme baseColor="#313131" highlightColor="#444">
              <Skeleton variant="rectangular" width={51} height={51}/>
            </SkeletonTheme>
          )}
          </TrackTitleImg>

          {(props.isTrackLoaded) ? (
            <div>
              <TrackTitleLink href="http://">{ props.trackName }
                <TrackTitleSpan>{ props.trackNameSpan }</TrackTitleSpan>
              </TrackTitleLink>
            </div>
          ) : (
            <SkeletonTheme baseColor="#313131" highlightColor="#444">
              <Skeleton variant="rectangular" width={356} height={19}/>
            </SkeletonTheme>
          )}
        </TrackTitle>

        <TrackAuthor>
        {(props.isTrackLoaded) ? (
          <TrackAuthorLink href="http://">{ props.authorName }</TrackAuthorLink>
        ) : (
          <SkeletonTheme baseColor="#313131" highlightColor="#444">
            <Skeleton variant="rectangular" width={271} height={19}/>
          </SkeletonTheme>
        )}
        </TrackAuthor>

        {(props.isTrackLoaded) ? (
          <TrackAlbum>
            <TrackAlbumLink href="http://">{ props.albumName }</TrackAlbumLink>
          </TrackAlbum>
        ) : (
          <SkeletonTheme baseColor="#313131" highlightColor="#444">
            <Skeleton variant="rectangular" width={305} height={19}/>
          </SkeletonTheme>
        )}

        {(props.isTrackLoaded) && (
          <div>
            <TrackTimeSvg isLiked={ isLiked } alt="time" onClick={ onLikeClick }>
              <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
            </TrackTimeSvg>
            <TrackTimeText>{ props.trackTime }</TrackTimeText>
          </div>
        )}
      </PlaylistTrack>
    </PlaylistItem>
	);
}
	
export default Track;
	