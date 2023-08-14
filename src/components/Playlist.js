import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import './Playlist.css';


function Playlist(props) {
  const [isLoaded, setLoadedState] = useState(false);

  useEffect(() => {
      setTimeout(() => {
          setLoadedState(true);
        }, 5000);

      return () => {}
    }, []);

	return (
      <div className="sidebar__item">
        <a className="sidebar__link" href="#">
        {isLoaded ? (
          <img
            className="sidebar__img"
            src={props.imageSrcPath}
            alt="day's playlist"
          />
        ) : (
          <SkeletonTheme baseColor="#313131" highlightColor="#444">
            <Skeleton variant="rectangular" width={250} height={150}/>
          </SkeletonTheme>
        )}
        </a>
      </div>
	);
}
	
export default Playlist;