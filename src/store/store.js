import { configureStore } from "@reduxjs/toolkit";
import { preloadedPlaylistReducer, currPlaylistReducer, trackReducer, shuffledStateReducer, shuffledPlaylistReducer, currentTrackLikedStateReducer } from "./reducers";


export const store = configureStore({
	reducer: {
		currentTrack: trackReducer,
		isCurrentTrackLiked: currentTrackLikedStateReducer,
		preloadedPlaylist: preloadedPlaylistReducer,
		currPlaylist: currPlaylistReducer,
		isShuffled: shuffledStateReducer,
		shuffledPlaylist: shuffledPlaylistReducer }
	});
