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
		return false;
	return response;
}
