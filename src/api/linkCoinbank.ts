import { Storage } from "../util/Storage";
import { sleep } from "../util/sleep";
import { refresh } from "./refresh";
import { API } from "./request";

async function _linkcoinbank(in_refresh: boolean, cb_id: string, u_secret: string) {
	if (!in_refresh) {
		return false;
	}
	try {
		const active_token = await Storage.load('active_token');
		const user_id = await Storage.load('user_id');
		const response = await API.post<API.BasicResponse>(
			`/coinbank/link`,
			{
				cb_id: cb_id,
				u_id: user_id,
				u_secret: u_secret
			},
			{
				headers: {
					'User-Id': user_id as string,
					'Token': active_token as string,
				}
			});
		if (!response) {
			throw new API.APIError(500, "No response from server", "linkCoinbank.ts", "/coinbank/link");
		}
		if (!response.success) {
			throw new API.APIError(response.status, response.message, "linkCoinbank.ts", "/coinbank/link");
		}

		return response;

	} catch (e: any) {
		if (e instanceof API.APIError) {
			console.error(`[API::linkCoinbank] ${e.message}`);
		}
		return undefined;
	}
}

export const linkCoinbank = async (cb_id: string, u_secret: string) => refresh<number | undefined>((v) => _linkcoinbank(v, cb_id, u_secret));
