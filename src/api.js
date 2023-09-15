const apiAddr = "https://skypro-music-api.skyeng.tech/catalog/";


export async function getTrackList() {
	const response = await fetch(apiAddr + "track/all", { method: "GET" });
	const data = await response.json();

	return data;
}

export async function getTrackSrcURL(trackId) {
	const response = await fetch(apiAddr + "track/" + trackId, { method: "GET" });
	const data = await response.json();

	return data;
}
