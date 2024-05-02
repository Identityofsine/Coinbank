import { Storage } from "../util/Storage";
import { API } from "./request";

export async function verify(token: string) {
	if (await Storage.load('active_token'))
		return true;
	return false
}

export async function login(username: string, password: string) {
	const response = await API.post<API.LoginResponse>('/user/login', { username, password });
	if (!response)
		throw new API.APIError(500, 'Server error', 'login.ts', '/user/login');
	if (!response.success) {
		throw new API.APIError(response.status, response.message, 'login.ts', '/user/login');
	}
	return response;
}
