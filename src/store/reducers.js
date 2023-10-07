import { GENERATE_SHUFFLED_PLAYLIST, SET_CURRENT_PLAYLIST, RESET_CURRENT_TRACK, SET_CURRENT_TRACK_LIKED_STATE,
	SET_CURRENT_TRACK, SET_NEXT_TRACK, SET_PREV_TRACK, SET_SHUFFLED, SET_PRELOADED_PLAYLIST } from "./types";


const initialState = {
	currentTrack: null,
	isCurrentTrackLiked: false,
	preloadedPlaylist: [],
	currPlaylist: [],
	isShuffled: false,
	shuffledPlaylist: []
};


export const trackReducer = (state = null, action) => {
	switch (action.type)
	{
		case SET_CURRENT_TRACK:
		case RESET_CURRENT_TRACK:
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

export const currentTrackLikedStateReducer = (state = false, action) => {
	switch (action.type)
	{
		case SET_CURRENT_TRACK_LIKED_STATE:
		{
			return action.payload;
		}

		default:
		{
			return state;
		}
	}
};

export const preloadedPlaylistReducer = (state = [], action) => {
	switch (action.type)
	{
		case SET_PRELOADED_PLAYLIST:
		{
			return action.payload;
		}

		default:
		{
			return state;
		}
	}
};

export const currPlaylistReducer = (state = [], action) => {
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
