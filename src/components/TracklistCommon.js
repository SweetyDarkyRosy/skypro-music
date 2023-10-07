import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Track from './Track';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { getTrackList, getFavouriteTrackList } from '../api'
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

const TracklistFilterSection = styled.div`
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

const TracklistFilterSectionTitle = styled.div`
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

const TracklistFilterBlock = styled.div`
  display: block;
  position: relative;

  &:not(:last-child) {
    margin-right: 10px;
  }
`

const TracklistFilterButton = styled.div`
  padding: 6px 20px;

  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
`

function TracklistCommon() {
  const [isAuthorFilterVisible, setAuthorFilterVisibilityState] = useState(false);
  const [isReleaseYearFilterVisible, setReleaseYearFilterVisibilityState] = useState(false);
  const [isGenreFilterVisible, setGenreFilterVisibilityState] = useState(false);

  const [isTrackListLoadingSuccessful, setTrackListLoadingSuccessStatus] = useState(true);
  const [isTrackListLoaded, setIfTrackListLoaded] = useState(false);

  const [authorList, setAuthorList] = useState([]);
  const [authorFilter, setAuthorFilter] = useState(null);
  const [genreList, setGenreList] = useState([]);
  const [genreFilter, setGenreFilter] = useState(null);
  const releaseYearDirecionOptions = ['По умолчанию', 'Сначала новые', 'Сначала старые'];
  const [chosenReleaseYearDirecion, setChosenReleaseYearDirecion] = useState('По умолчанию');
  const [searchParam, setSearchParam] = useState("");

  const preloadedPlaylist = useSelector(state => state.preloadedPlaylist);
  const dispatch = useDispatch();
  const authContext = useAuthContext();


  let setSearchInputTimeout = null;

  const onSearchParamChanged = (searchParamValue) => {
    const setSearchInput = () => {
      setSearchParam(searchParamValue);
    }

    clearTimeout(setSearchInputTimeout);
    setSearchInputTimeout = setTimeout(setSearchInput, 1000)
  }

  const toggleAuthorFilterVisibility = () => {
    setAuthorFilterVisibilityState(!isAuthorFilterVisible);

    setReleaseYearFilterVisibilityState(false);
    setGenreFilterVisibilityState(false);
  }

  const toggleReleaseYearFilterVisibility = () => {
    setReleaseYearFilterVisibilityState(!isReleaseYearFilterVisible);

    setAuthorFilterVisibilityState(false);
    setGenreFilterVisibilityState(false);
  }

  const toggleGenreFFilterVisibility = () => {
    setGenreFilterVisibilityState(!isGenreFilterVisible);

    setAuthorFilterVisibilityState(false);
    setReleaseYearFilterVisibilityState(false);
  }

  const refreshPlaylistWithFilterChange = () => {
    setIfTrackListLoaded(false);

    getTrackList().then((data) => {
        const trackListProcessed = [];

        getFavouriteTrackList(authContext.accessToken.accessToken).then((getFavouriteTracksResultData) => {
            data.forEach((track) => {
                let isAccepted = true;

                if (authorFilter !== null)
                {
                  if (track.author !== authorFilter)
                  {
                    isAccepted = false;
                  }
                }

                if (genreFilter !== null)
                {
                  if (track.genre !== genreFilter)
                  {
                    isAccepted = false;
                  }
                }

                if (searchParam !== "")
                {
                  if (track.name.includes(searchParam) === false)
                  {
                    isAccepted = false;
                  }
                }

                if (isAccepted === true)
                {
                  const durationStr = (Math.floor(track.duration_in_seconds / 60)) + ":" + (track.duration_in_seconds % 60);

                  let isLiked = false;
                  for (let i = 0; i < getFavouriteTracksResultData.length; i++)
                  {
                    if (getFavouriteTracksResultData[i].id === track.id)
                    {
                      isLiked = true;
                      break;
                    }
                  }

                  const trackAdded = {
                    trackId: track.id,
                    trackName: track.name,
                    authorName: track.author,
                    albumName: track.album,
                    releaseDate: track.release_date,
                    genre: track.genre,
                    isLiked: isLiked,
                    trackDuration: durationStr
                  };

                  trackListProcessed.push(trackAdded);
                }
              });

            if (chosenReleaseYearDirecion != 'По умолчанию')
            {
              if (chosenReleaseYearDirecion == 'Сначала новые')
              {
                trackListProcessed.sort((a, b) => { 
                      if (Date.parse(b["releaseDate"]) >= Date.parse(a["releaseDate"]))
                      {
                        return true;
                      }
                      else
                      {
                        return false;
                      }
                    });
              }
              else
              {
                trackListProcessed.sort((a, b) => { 
                  if (Date.parse(b["releaseDate"]) < Date.parse(a["releaseDate"]))
                  {
                    return true;
                  }
                  else
                  {
                    return false;
                  }
                });
              }
            }

            dispatch(setPreloadedPlaylist(trackListProcessed));

            setIfTrackListLoaded(true);
            setTrackListLoadingSuccessStatus(true);
          }).catch((error) => {
              console.error(" - Error: Could not get a list of favourite tracks");
            });
      }).catch((error) => {
          console.error(" - Error: Could not load a list of tracks available");

          setTrackListLoadingSuccessStatus(false);
        });
  }

  useEffect(() => {
      refreshPlaylistWithFilterChange();
    }, [authorFilter, genreFilter, chosenReleaseYearDirecion, searchParam])

  useEffect(() => {
      getTrackList().then((data) => {
          const trackListProcessed = [];

          getFavouriteTrackList(authContext.accessToken.accessToken).then((getFavouriteTracksResultData) => {
              const authorListProcessed = [];
              const genreListProcessed = [];

              data.forEach((track) => {
                  const durationStr = (Math.floor(track.duration_in_seconds / 60)) + ":" + (track.duration_in_seconds % 60);
    
                  let isLiked = false;
                  for (let i = 0; i < getFavouriteTracksResultData.length; i++)
                  {
                    if (getFavouriteTracksResultData[i].id === track.id)
                    {
                      isLiked = true;
                      break;
                    }
                  }
    
                  const trackAdded = {
                    trackId: track.id,
                    trackName: track.name,
                    authorName: track.author,
                    albumName: track.album,
                    releaseDate: track.release_date,
                    genre: track.genre,
                    isLiked: isLiked,
                    trackDuration: durationStr
                  };

                  if (authorListProcessed.includes(track.author) === false)
                  {
                    authorListProcessed.push(track.author);
                  }

                  if (genreListProcessed.includes(track.genre) === false)
                  {
                    genreListProcessed.push(track.genre);
                  }

                  trackListProcessed.push(trackAdded);
                });

              setAuthorList(authorListProcessed);
              setGenreList(genreListProcessed);

              dispatch(setPreloadedPlaylist(trackListProcessed));

              setIfTrackListLoaded(true);
              setTrackListLoadingSuccessStatus(true);
            }).catch((error) => {
                console.error(" - Error: Could not get a list of favourite tracks");
              });
        }).catch((error) => {
            console.error(" - Error: Could not load a list of tracks available");

            setTrackListLoadingSuccessStatus(false);
          });
    }, [])

	return (
		<TracklistEl className="centerblock">
      <SearchBar setSearchParamFunc={ onSearchParamChanged } />
      <TrackListSpecificH2>Треки</TrackListSpecificH2>
      <TracklistFilterSection className="filter">
        <TracklistFilterSectionTitle>Искать по:</TracklistFilterSectionTitle>
        <TracklistFilterBlock>
          <TracklistFilterButton className="button-author _btn-text" onClick={ toggleAuthorFilterVisibility }>
            исполнителю
          </TracklistFilterButton>
          {isAuthorFilterVisible && (
            <Filter options={ authorList } currOption={ authorFilter } action={ setAuthorFilter } isMandatory={ false }/>
          )}
        </TracklistFilterBlock>
        
        <TracklistFilterBlock>
          <TracklistFilterButton className="button-year _btn-text" onClick={ toggleReleaseYearFilterVisibility }>
            году выпуска
          </TracklistFilterButton>
          {isReleaseYearFilterVisible && (
            <Filter options={ releaseYearDirecionOptions } currOption={ chosenReleaseYearDirecion } action={ setChosenReleaseYearDirecion } isMandatory={ true }/>
          )}
        </TracklistFilterBlock>

        <TracklistFilterBlock>
          <TracklistFilterButton className="button-genre _btn-text" onClick={ toggleGenreFFilterVisibility }>
            жанру
          </TracklistFilterButton>
          {isGenreFilterVisible && (
            <Filter options={ genreList } currOption={ genreFilter } action={ setGenreFilter } isMandatory={ false }/>
          )}
        </TracklistFilterBlock>
      </TracklistFilterSection>
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

export default TracklistCommon;
