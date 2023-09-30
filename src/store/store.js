import { configureStore } from "@reduxjs/toolkit";
import { preloadedPlaylistReducer, currPlaylistReducer, trackReducer, shuffledStateReducer, shuffledPlaylistReducer } from "./reducers";


export const store = configureStore({
	reducer: {
		currentTrack: trackReducer,
		preloadedPlaylist: preloadedPlaylistReducer,
		currPlaylist: currPlaylistReducer,
		isShuffled: shuffledStateReducer,
		shuffledPlaylist: shuffledPlaylistReducer }
	});
