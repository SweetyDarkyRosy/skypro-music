import { configureStore } from "@reduxjs/toolkit";
import { playlistReducer, trackReducer, shuffledStateReducer, shuffledPlaylistReducer } from "./reducers";


export const store = configureStore({
	reducer: {
		currentTrack: trackReducer,
		playlist: playlistReducer,
		isShuffled: shuffledStateReducer,
		shuffledPlaylist: shuffledPlaylistReducer }
	});
