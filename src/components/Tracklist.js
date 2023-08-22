import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Track from './Track';
import SearchBar from './SearchBar';
import Filter from './Filter';


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
  const [isAuthorFilterLoaded, setAuthorFilterLoadedState] = useState(false);

  const toggleAuthorFilterVisibility = () => setAuthorFilterLoadedState(!isAuthorFilterLoaded);

	return (
		<TracklistEl className="centerblock">
      <SearchBar/>
      <TrackListSpecificH2>Треки</TrackListSpecificH2>
      <TracklistFilterBlock className="filter">
        <TracklistFilterBlockTitle>Искать по:</TracklistFilterBlockTitle>
        <TracklistFilterButton className="button-author _btn-text" onClick={toggleAuthorFilterVisibility}>
          исполнителю

        {isAuthorFilterLoaded && (
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
          <Track trackName="Guilt" authorName="Nero" albumName="Welcome Reality" trackTime="4:44"/>
          <Track trackName="Elektro" authorName="Dynoro, Outwork, Mr. Gee" albumName="Elektro" trackTime="2:22"/>
          <Track trackName="I’m Fire" authorName="Ali Bakgor" albumName="I’m Fire" trackTime="2:22"/>
          <Track trackName="Non Stop" trackNameSpan="(Remix)" authorName="Стоункат, Psychopath" albumName="Non Stop" trackTime="4:12"/>
          <Track trackName="Run Run" trackNameSpan="(feat. AR/CO)" authorName="Jaded, Will Clarke, AR/CO" albumName="Run Run" trackTime="2:54"/>
          <Track trackName="Eyes on Fire" trackNameSpan="(Zeds Dead Remix)" authorName="Blue Foundation, Zeds Dead" albumName="Eyes on Fire" trackTime="5:20"/>
          <Track trackName="Mucho Bien" trackNameSpan="(Hi Profile Remix)" authorName="HYBIT, Mr. Black, Offer Nissim, Hi Profile" albumName="Mucho Bien" trackTime="3:41"/>
          <Track trackName="Knives n Cherries" authorName="minthaze" albumName="Captivating" trackTime="1:48"/>
          <Track trackName="How Deep Is Your Love" authorName="Calvin Harris, Disciples" albumName="How Deep Is Your Love" trackTime="3:32"/>
          <Track trackName="Morena" authorName="Tom Boxer" albumName="Soundz Made in Romania" trackTime="3:36"/>
        </TracklistContentPlaylist>
      </TracklistContent>
    </TracklistEl>
	);
}

export default Tracklist;
