import { useDispatch } from "react-redux";
import { GENERATE_SHUFFLED_PLAYLIST, SET_CURRENT_PLAYLIST, SET_CURRENT_TRACK, SET_NEXT_TRACK, SET_PREV_TRACK, SET_SHUFFLED } from "./types";


const initialState = {
	currentTrack: null,
	playlist: [],
	isShuffled: false,
	shuffledPlaylist: []
};


export const trackReducer = (state = null, action) => {
	switch (action.type)
	{
		case SET_CURRENT_TRACK:
		case SET_PREV_TRACK:
		case SET_NEXT_TRACK:
		{
			return action.payload;
		}

		default:
		{
			return state;
		}
	}
};

export const playlistReducer = (state = [], action) => {
	switch (action.type)
	{
		case SET_CURRENT_PLAYLIST:
		{
			return action.payload;
		}

		default:
		{
			return state;
		}
	}
};

export const shuffledStateReducer = (state = false, action) => {
	switch (action.type)
	{
		case SET_SHUFFLED:
		{
			return action.payload;
		}

		default:
		{
			return state;
		}
	}
};

export const shuffledPlaylistReducer = (state = [], action) => {
	switch (action.type)
	{
		case GENERATE_SHUFFLED_PLAYLIST:
		{
			return action.payload
		}

		default:
		{
			return state;
		}
	}
};
