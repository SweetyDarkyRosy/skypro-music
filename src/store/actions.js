import { GENERATE_SHUFFLED_PLAYLIST, SET_PRELOADED_PLAYLIST, SET_CURRENT_PLAYLIST, RESET_CURRENT_TRACK, SET_CURRENT_TRACK,
	SET_CURRENT_TRACK_LIKED_STATE, SET_NEXT_TRACK, SET_PREV_TRACK, SET_SHUFFLED } from "./types";
import { getTrackSrcURL } from "../api";


export const setCurrTrack = (trackId, isLiked) => {
	return async (dispatch) => {
		try {
			const incomingData = await getTrackSrcURL(trackId);
			const trackData = { id: incomingData.id, name: incomingData.name, author: incomingData.author,
				url: incomingData.track_file, isLiked: isLiked };

			dispatch(
				{
					type: SET_CURRENT_TRACK,
					payload: trackData
				});

			dispatch(
				{
					type: SET_CURRENT_TRACK_LIKED_STATE,
					payload: isLiked
				});
		} catch (error) {
				console.error(" - Error: Could not load a track");

				dispatch(
					{
						type: SET_CURRENT_TRACK,
						payload: null
					});
			}
	}
};

export const resetCurrTrack = () => {
	return {
		type: RESET_CURRENT_TRACK,
		payload: null
	};
};

export const setIfCurrTrackIsLiked = (isLiked) => {
	return {
		type: SET_CURRENT_TRACK_LIKED_STATE,
		payload: isLiked
	};
};

export const setPreloadedPlaylist = (playlist) => {
	return {
		type: SET_PRELOADED_PLAYLIST,
		payload: playlist
	};
};

export const setCurrentPlaylist = (playlist) => {
	return {
		type: SET_CURRENT_PLAYLIST,
		payload: playlist
	};
};

export const setPrevTrack = (currTrackId, playlist) => {
	let nextTrackId;

	for (let i = 0; i < playlist.length; i++)
	{
		if (playlist[i].trackId === currTrackId)
		{
			if ((i - 1) < 0)
			{
				nextTrackId = playlist[playlist.length - 1].trackId;
			}
			else
			{
				nextTrackId = playlist[(i - 1) % playlist.length].trackId;
			}

			break;
		}
	}

	return async (dispatch) => {
		try {
			const incomingData = await getTrackSrcURL(nextTrackId);
			const trackData = { id: incomingData.id, name: incomingData.name, author: incomingData.author,
				url: incomingData.track_file };

			dispatch(
				{
					type: SET_PREV_TRACK,
					payload: trackData
				});
		} catch (error) {
				console.error(" - Error: Could not load a track");

				dispatch(
					{
						type: SET_PREV_TRACK,
						payload: null
					});
			}
	}
};

export const setNextTrack = (currTrackId, playlist) => {
	let nextTrackId;

	for (let i = 0; i < playlist.length; i++)
	{
		if (playlist[i].trackId === currTrackId)
		{
			nextTrackId = playlist[(i + 1) % playlist.length].trackId;

			break;
		}
	}

	return async (dispatch) => {
		try {
			const incomingData = await getTrackSrcURL(nextTrackId);
			const trackData = { id: incomingData.id, name: incomingData.name, author: incomingData.author,
				url: incomingData.track_file };

			dispatch(
				{
					type: SET_NEXT_TRACK,
					payload: trackData
				});
		} catch (error) {
				console.error(" - Error: Could not load a track");

				dispatch(
					{
						type: SET_NEXT_TRACK,
						payload: null
					});
			}
	}
};

export const setIfShuffled = (isShuffled) => {
	return {
		type: SET_SHUFFLED,
		payload: isShuffled
	};
}

export const generateShuffledPlaylist = (playlist) => {
	const srcPlaylist = [...playlist];
	const shuffledPlaylist = [];

	while (srcPlaylist.length !== 0)
	{
		const randomIndex = Math.floor(Math.random() * srcPlaylist.length);

		shuffledPlaylist.push(srcPlaylist[randomIndex]);
		srcPlaylist.splice(randomIndex, 1);
	}

	return {
		type: GENERATE_SHUFFLED_PLAYLIST,
		payload: shuffledPlaylist
	};
}
