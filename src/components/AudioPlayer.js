import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import './AudioPlayer.css';


function AudioPlayer() {
  const [isLoaded, setLoadedState] = useState(false);

  useEffect(() => {
      setTimeout(() => {
          setLoadedState(true);
        }, 5000);

      return () => {}
    }, []);

  
	return (
		<div className="bar">
          <div className="bar__content">
            <div className="bar__player-progress"></div>
            <div className="bar__player-block">
              <div className="bar__player player">
                <div className="player__controls">
                  <div className="player__btn-prev">
                    <svg className="player__btn-prev-svg" alt="prev">
                      <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                    </svg>
                  </div>
                  <div className="player__btn-play _btn">
                    <svg className="player__btn-play-svg" alt="play">
                      <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
                    </svg>
                  </div>
                  <div className="player__btn-next">
                    <svg className="player__btn-next-svg" alt="next">
                      <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                    </svg>
                  </div>
                  <div className="player__btn-repeat _btn-icon">
                    <svg className="player__btn-repeat-svg" alt="repeat">
                      <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                    </svg>
                  </div>
                  <div className="player__btn-shuffle _btn-icon">
                    <svg className="player__btn-shuffle-svg" alt="shuffle">
                      <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                    </svg>
                  </div>
                </div>

                <div className="player__track-play track-play">
                  <div className="track-play__contain">
                    <div className="track-play__image">
                    {isLoaded ? (
                      <svg className="track-play__svg" alt="music">
                        <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                      </svg>
                    ) : (
                      <SkeletonTheme baseColor="#313131" highlightColor="#444">
                        <Skeleton variant="rectangular" width={51} height={51}/>
                      </SkeletonTheme>
                    )}
                    </div>
                    <div className="track-play__author">
                    {isLoaded ? (
                      <a className="track-play__author-link" href="http://">Ты та...</a>
                    ) : (
                      <SkeletonTheme baseColor="#313131" highlightColor="#444">
                        <Skeleton variant="rectangular" width={59} height={15}/>
                      </SkeletonTheme>
                    )}
                    </div>
                    <div className="track-play__album">
                    {isLoaded ? (
                      <a className="track-play__album-link" href="http://">Баста</a>
                    ) : (
                      <SkeletonTheme baseColor="#313131" highlightColor="#444">
                        <Skeleton variant="rectangular" width={59} height={15}/>
                      </SkeletonTheme>
                    )}
                    </div>
                  </div>

                  <div className="track-play__like-dis">
                    <div className="track-play__like _btn-icon">
                      <svg className="track-play__like-svg" alt="like">
                        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                      </svg>
                    </div>
                    <div className="track-play__dislike _btn-icon">
                      <svg className="track-play__dislike-svg" alt="dislike">
                        <use
                          xlinkHref="img/icon/sprite.svg#icon-dislike"
                        ></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bar__volume-block volume">
                <div className="volume__content">
                  <div className="volume__image">
                    <svg className="volume__svg" alt="volume">
                      <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
                    </svg>
                  </div>
                  <div className="volume__progress _btn">
                    <input
                      className="volume__progress-line _btn"
                      type="range"
                      name="range"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
	);
}

export default AudioPlayer;
