import { Storage } from "../util/Storage";
import { _refreshwrapper, refresh } from "./refresh";
import { API } from "./request";

async function _getCoinbanks(in_refresh: boolean = false) {
	if (!in_refresh) return;
	try {
		const u_id = await Storage.load('user_id');
		const access_token = await Storage.load('active_token');
		if (!u_id || !access_token) {
			throw new API.APIError(400, "No access token or User-ID found", "getCoinbanks", "/user/coinbanks");
		}
		const response = await API.get<API.GetCoinbanksResponse>('/user/coinbanks', {
			headers: {
				'User-Id': u_id,
				'Token': access_token
			}
		});
		if (!response) {
			throw new API.APIError(500, "No response from server", "getCoinbanks", "/user/coinbanks");
		}
		if (!response.success) {
			throw new API.APIError(response.status, response.message, "getCoinbanks", "/user/coinbanks");
		}
		return response;
	} catch (e: any) {
		if (e instanceof API.APIError) {
			console.error("API Error: %s", e.message);
			return undefined;
		} else {
			console.error("Error fetching coinbanks: %s", e);
			return undefined;
		}
	}
}

export const getCoinbanks = async () => refresh<API.GetCoinbanksResponse>(_getCoinbanks);

