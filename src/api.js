const trackDataAPIAddr = "https://skypro-music-api.skyeng.tech/catalog/";
const userDataAPIAddr = "https://skypro-music-api.skyeng.tech/user/";


export async function getTrackList() {
	const response = await fetch(trackDataAPIAddr + "track/all", { method: "GET" });
	const data = await response.json();

	return data;
}

export async function getTrackSrcURL(trackId) {
	const response = await fetch(trackDataAPIAddr + "track/" + trackId, { method: "GET" });
	const data = await response.json();

	return data;
}

export async function addFavouriteTrack(trackId, token) {
	const response = await fetch(trackDataAPIAddr + "track/" + trackId + "/favorite/",
		{
			method: "POST",
			headers: {
					Authorization: `Bearer ${token}`,
				},
		});
	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function deleteFavouriteTrack(trackId, token) {
	const response = await fetch(trackDataAPIAddr + "track/" + trackId + "/favorite/",
		{
			method: "DELETE",
			headers: {
					Authorization: `Bearer ${token}`,
				},
		});
	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function getFavouriteTrackList(token) {
	const response = await fetch(trackDataAPIAddr + "track/favorite/all/",
		{
			method: "GET",
			headers: {
					Authorization: `Bearer ${token}`,
				},
		});
	const data = await response.json();

	return data;
}

export async function getSelectionList() {
	const response = await fetch(trackDataAPIAddr + "selection/", { method: "GET" });
	const data = await response.json();

	return data;
}

export async function getSpecificSelectionList(categoryId) {
	const response = await fetch(trackDataAPIAddr + "selection/" + categoryId + "/", { method: "GET" });
	const data = await response.json();

	return data;
}

export async function registerNewUser({ email, password, username }) {
	const response = await fetch(userDataAPIAddr + "signup/",
		{
			method: "POST",
			body: JSON.stringify(
				{
					email: email,
					password: password,
					username: username
				}),
			headers: { "content-type": "application/json" }
		});
	const data = await response.json();

	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function logIn({ email, password }) {
	const response = await fetch(userDataAPIAddr + "login/",
		{
			method: "POST",
			body: JSON.stringify(
				{
					email: email,
					password: password
				}),
			headers: { "content-type": "application/json" }
		});
	const data = await response.json();
	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function getToken({ email, password }) {
	const response = await fetch(userDataAPIAddr + "token/",
		{
			method: "POST",
			body: JSON.stringify(
				{
					email: email,
					password: password
				}),
			headers: { "content-type": "application/json" }
		});
	const data = await response.json();
	const result = {
		status: response.status,
		data: data
	};

	return result;
}

export async function refreshToken({ refreshToken }) {
	const response = await fetch(userDataAPIAddr + "token/refresh/",
		{
			method: "POST",
			body: JSON.stringify(
				{
					refresh: refreshToken
				}),
			headers: { "content-type": "application/json" }
		});
	const data = await response.json();
	const result = {
		status: response.status,
		data: data
	};

	return result;
}
