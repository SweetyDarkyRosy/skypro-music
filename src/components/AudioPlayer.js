import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import styled from 'styled-components';


const Bar = styled.div`
  position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	background: rgba(28, 28, 28, 0.5);
`;

const BarContent = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
`;

const BarPlayerProgress = styled.div`
  width: 100%;
  height: 5px;
  background: #2e2e2e;
`;

const BarPlayerBlock = styled.div`
  height: 73px;
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
`;

const Player = styled.div`
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
	-webkit-box-pack: start;
	-ms-flex-pack: start;
	justify-content: flex-start;
`;

const PlayerControls = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  padding: 0 27px 0 31px;
`;

const PlayerButton = styled.div`
  padding: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

const PlayerButtonPrev = styled(PlayerButton)`
  margin-right: 23px;
`;

const PlayerButtonPrevSvg = styled.svg`
  width: 15px;
	height: 14px;
`;

const PlayerButtonPlay = styled(PlayerButton)`
  margin-right: 23px;
`;

const PlayerButtonPlaySvg = styled.svg`
  width: 22px;
  height: 20px;
  fill: #d9d9d9;
`;

const PlayerButtonNext = styled(PlayerButton)`
  margin-right: 28px;
  fill: #a53939;
`;

const PlayerButtonNextSvg = styled.svg`
  width: 15px;
  height: 14px;
  fill: inherit;
  stroke: #d9d9d9;
`;

const PlayerButtonRepeat = styled(PlayerButton)`
  margin-right: 24px;
`;

const PlayerButtonRepeatSvg = styled.svg`
  width: 18px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

const PlayerButtonShuffle = styled(PlayerButton)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

const PlayerButtonShuffleSvg = styled.svg`
  width: 19px;
	height: 12px;
	fill: transparent;
	stroke: #696969;
`;

const PlayerTrackPlay = styled.div`
  display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-ms-flex-direction: row;
	flex-direction: row;
`;

const PlayerTrackPlayContain = styled.div`
  width: auto;
	display: -ms-grid;
	display: grid;
	-ms-grid-columns: auto 1fr;
	grid-template-columns: auto 1fr;
	grid-template-areas: "image author" "image album";
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
`;

const PlayerTrackPlayImage = styled.div`
  width: 51px;
  height: 51px;
  background-color: #313131;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: 12px;
  -ms-grid-row: 1;
  -ms-grid-row-span: 2;
  -ms-grid-column: 1;
  grid-area: image;
`;

const PlayerTrackPlaySvg = styled.svg`
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
`;

const PlayerTrackPlayAuthor = styled.div`
  -ms-grid-row: 1;
  -ms-grid-column: 2;
  grid-area: author;
  min-width: 49px;
`;

const PlayerTrackPlayAuthorLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  white-space: nowrap;
`;

const PlayerTrackPlayAlbum = styled.div`
  -ms-grid-row: 2;
  -ms-grid-column: 2;
  grid-area: album;
  min-width: 49px;
`;

const PlayerTrackPlayAlbumLink = styled.a`
  font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 24px;
	color: #ffffff;
`;

const PlayerTrackPlayLikeDislike = styled.div`
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
  margin-left: 26%;
`;

const PlayerTrackPlayLike = styled.div`
  padding: 5px;
`;

const PlayerTrackPlayLikeSvg = styled.svg`
  width: 14px;
	height: 12px;
	fill: transparent;
	stroke: #696969;
`;

const PlayerTrackPlayDislike = styled(PlayerTrackPlayLike)`
  margin-left: 28.5px;
`;

const PlayerTrackPlayDislikeSvg = styled.svg`
  width: 14.34px;
  height: 13px;
  fill: transparent;
  stroke: #696969;
`;

const Volume = styled.div`
  width: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 92px 0 0;
`;

const VolumeContent = styled.div`
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
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: end;
`;

const VolumeImg = styled.div`
  width: 13px;
  height: 18px;
  margin-right: 17px;
`;

const VolumeSvg = styled.svg`
  width: 13px;
  height: 18px;
  fill: transparent;
`;

const VolumeProgress = styled.div`
  width: 109px;
`;

const VolumeProgressLine = styled.input`
  width: 109px;
`;


function AudioPlayer({ musicInfo }) {
	return (
  <React.Fragment>
  {musicInfo.isShown && (
		<Bar>
      <BarContent>
        <BarPlayerProgress/>
        <BarPlayerBlock>
          <Player className="player">
            <PlayerControls>
              <PlayerButtonPrev>
                <PlayerButtonPrevSvg alt="prev">
                  <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                </PlayerButtonPrevSvg>
              </PlayerButtonPrev>
              <PlayerButtonPlay className="_btn">
                <PlayerButtonPlaySvg alt="play">
                  <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
                </PlayerButtonPlaySvg>
              </PlayerButtonPlay>
              <PlayerButtonNext>
                <PlayerButtonNextSvg alt="next">
                  <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                </PlayerButtonNextSvg>
              </PlayerButtonNext>
              <PlayerButtonRepeat className="_btn-icon">
                <PlayerButtonRepeatSvg alt="repeat">
                  <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
                </PlayerButtonRepeatSvg>
              </PlayerButtonRepeat>
              <PlayerButtonShuffle className="_btn-icon">
                <PlayerButtonShuffleSvg alt="shuffle">
                  <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                </PlayerButtonShuffleSvg>
              </PlayerButtonShuffle>
            </PlayerControls>

            {musicInfo.isPlayed && (
              <audio src={ musicInfo.src } loop autoPlay></audio>
            )}

            <PlayerTrackPlay className="track-play">
              <PlayerTrackPlayContain>
                <PlayerTrackPlayImage>
                {musicInfo.isPlayed ? (
                  <PlayerTrackPlaySvg alt="music">
                    <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                  </PlayerTrackPlaySvg>
                ) : (
                  <SkeletonTheme baseColor="#313131" highlightColor="#444">
                    <Skeleton variant="rectangular" width={51} height={51}/>
                  </SkeletonTheme>
                )}
                </PlayerTrackPlayImage>
                <PlayerTrackPlayAuthor>
                {musicInfo.isPlayed ? (
                  <PlayerTrackPlayAuthorLink href="http://">{ musicInfo.trackName }</PlayerTrackPlayAuthorLink>
                ) : (
                  <SkeletonTheme baseColor="#313131" highlightColor="#444">
                    <Skeleton variant="rectangular" width={59} height={15}/>
                  </SkeletonTheme>
                )}
                </PlayerTrackPlayAuthor>
                <PlayerTrackPlayAlbum>
                {musicInfo.isPlayed ? (
                  <PlayerTrackPlayAlbumLink href="http://">{ musicInfo.authorName }</PlayerTrackPlayAlbumLink>
                ) : (
                  <SkeletonTheme baseColor="#313131" highlightColor="#444">
                    <Skeleton variant="rectangular" width={59} height={15}/>
                  </SkeletonTheme>
                )}
                </PlayerTrackPlayAlbum>
              </PlayerTrackPlayContain>

              <PlayerTrackPlayLikeDislike>
                <PlayerTrackPlayLike className="_btn-icon">
                  <PlayerTrackPlayLikeSvg alt="like">
                    <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                  </PlayerTrackPlayLikeSvg>
                </PlayerTrackPlayLike>
                <PlayerTrackPlayDislike className="_btn-icon">
                  <PlayerTrackPlayDislikeSvg alt="dislike">
                    <use
                      xlinkHref="img/icon/sprite.svg#icon-dislike"
                    ></use>
                  </PlayerTrackPlayDislikeSvg>
                </PlayerTrackPlayDislike>
              </PlayerTrackPlayLikeDislike>
            </PlayerTrackPlay>
          </Player>
          <Volume className="volume">
            <VolumeContent>
              <VolumeImg>
                <VolumeSvg alt="volume">
                  <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
                </VolumeSvg>
              </VolumeImg>
              <VolumeProgress className="_btn">
                <VolumeProgressLine
                  className="_btn"
                  type="range"
                  name="range"
                />
              </VolumeProgress>
            </VolumeContent>
          </Volume>
        </BarPlayerBlock>
      </BarContent>
    </Bar>
  )}
  </React.Fragment>);
}

export default AudioPlayer;
