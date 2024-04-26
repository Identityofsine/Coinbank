import { API } from "./request";

export async function login(username: string, password: string) {
	const response = await API.post<API.LoginResponse>('/user/login', { username, password });
	if (!response)
		return false;
	return response;
}
