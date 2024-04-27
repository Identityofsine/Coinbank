//this function should be used as a wrapper for the refresh token endpoint, all authed requests should be made through this function

import { Storage } from "../util/Storage";
import { API } from "./request";

export async function refresh<T extends any = void>(callback: (result: boolean) => T) {
	try {
		const active_token = await Storage.load('active_token');
		const refresh_token = await Storage.load('refresh_token');
		if (!active_token || !refresh_token) {
			throw new Error("No active or refresh token found");
		}
		const response = await API.post<API.RefreshResponse>('/user/refresh', { active_token, refresh_token });
		if (!response) {
			throw new Error("No response from server");
		}
		if (response.status != 200) {
			throw new Error("Server returned error: " + response.message);
		}

		Storage.save('active_token', response.active_token);
	} catch (error) {
		console.error("Error refreshing token: %s", error);
		return callback(false);
	}
	return true;
}
