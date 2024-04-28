import { Storage } from "../util/Storage";
import { API } from "./request";

async function _gettransactions(in_refresh: boolean, cb_id: string) {
	if (!in_refresh) {
		return undefined;
	}
	try {
		const u_id = await Storage.load('user_id');
		const access_token = await Storage.load('active_token');
		if (!u_id || !access_token) {
			throw new API.APIError(400, "No access token or User-ID found", "getCoinbanks", "/user/coinbanks");
		}
		const response = await API.get<API.TransactionResponse>(`/coinbank/transactions?cb_id=${cb_id}`, {
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
			console.error("API Error: (status: %s, message:%s)", e.status, e.message);
			return undefined;
		} else {
			console.error("Error fetching coinbanks: %s", e);
			return undefined;
		}
	}
}
