//this function should be used as a wrapper for the refresh token endpoint, all authed requests should be made through this function

import { Storage } from "../util/Storage";
import { API } from "./request";

export async function refresh<T extends any = void>(callback: (result: boolean, status: any) => any): Promise<T> {
	try {
		const user_id = await Storage.load('user_id');
		const refresh_token = await Storage.load('refresh_token');
		if (!refresh_token || !user_id) {
			throw new Error("No refresh token or User-ID found");
		}
		const response = await API.post<API.RefreshResponse>(
			'/user/refresh',
			{ refresh_token: refresh_token },
			{
				headers: {
					'User-Id': user_id
				}
			});
		if (!response) {
			throw new API.APIError(500, "No response from server", "refresh", "/user/refresh");
		}
		if (response.status != 200) {
			throw new Error("Server returned error: " + response.message);
		}
		await Storage.save('active_token', response.active_token);
	} catch (error) {
		console.error("Error refreshing token: %s", error);
		return await callback(false, 0);
	}
	return await callback(true, 0);
}

export async function _refreshwrapper<T extends any = void>(callback: (...args: any) => Promise<T>) {
	return () => refresh((T: boolean) => callback(T));
}
