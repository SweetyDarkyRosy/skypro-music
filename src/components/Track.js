import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import './Track.css';


function Track(props) {
  const [isLoaded, setLoadedState] = useState(false);

  useEffect(() => {
      setTimeout(() => {
          setLoadedState(true);
        }, 5000);

      return () => {}
    }, []);

	return (
		<div className="playlist__item">
      <div className="playlist__track track">
        <div className="track__title">
          <div className="track__title-image">
          {isLoaded ? (
            <svg className="track__title-svg" alt="music">
              <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
            </svg>
          ) : (
            <SkeletonTheme baseColor="#313131" highlightColor="#444">
              <Skeleton variant="rectangular" width={51} height={51}/>
            </SkeletonTheme>
          )}
          </div>

          {isLoaded ? (
            <div className="track__title-text">
              <a className="track__title-link" href="http://">{props.trackName}
                <span className="track__title-span">{props.trackNameSpan}</span>
              </a>
            </div>
          ) : (
            <SkeletonTheme baseColor="#313131" highlightColor="#444">
              <Skeleton variant="rectangular" width={356} height={19}/>
            </SkeletonTheme>
          )}
        </div>

        
        <div className="track__author">
        {isLoaded ? (
          <a className="track__author-link" href="http://">{props.authorName}</a>
        ) : (
          <SkeletonTheme baseColor="#313131" highlightColor="#444">
            <Skeleton variant="rectangular" width={271} height={19}/>
          </SkeletonTheme>
        )}
        </div>

        {isLoaded ? (
          <div className="track__album">
            <a className="track__album-link" href="http://">{props.albumName}</a>
          </div>
        ) : (
          <SkeletonTheme baseColor="#313131" highlightColor="#444">
            <Skeleton variant="rectangular" width={305} height={19}/>
          </SkeletonTheme>
        )}

        {isLoaded && (
          <div className="track__time">
            <svg className="track__time-svg" alt="time">
              <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
            </svg>
            <span className="track__time-text">{props.trackTime}</span>
          </div>
        )}
      </div>
    </div>
	);
}
	
export default Track;
	