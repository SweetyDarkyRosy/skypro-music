import './Tracklist.css';
import Track from './Track';
import SearchBar from './SearchBar';


function Tracklist() {
	return (
		<div className="main__centerblock centerblock">
            <SearchBar/>
            <h2 className="centerblock__h2">Треки</h2>
            <div className="centerblock__filter filter">
              <div className="filter__title">Искать по:</div>
              <div className="filter__button button-author _btn-text">
                исполнителю
              </div>
              <div className="filter__button button-year _btn-text">
                году выпуска
              </div>
              <div className="filter__button button-genre _btn-text">жанру</div>
            </div>
            <div className="centerblock__content">
              <div className="content__title playlist-title">
                <div className="playlist-title__col col01">Трек</div>
                <div className="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
                <div className="playlist-title__col col03">АЛЬБОМ</div>
                <div className="playlist-title__col col04">
                  <svg className="playlist-title__svg" alt="time">
                    <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
                  </svg>
                </div>
              </div>
              <div className="content__playlist playlist">
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
              </div>
            </div>
          </div>
	);
}

export default Tracklist;
