import { Storage } from "../util/Storage";
import { sleep } from "../util/sleep";
import { refresh } from "./refresh";
import { API } from "./request";

async function _createcoinbank(in_refresh: boolean, name: string, emoji: string): Promise<API.CreateCoinbankResponse | undefined> {
	if (!in_refresh) {
		throw new API.APIError(401, "Refresh failed", "createCoinbank.ts", "/coinbank/createCoinbank");
	}
	try {
		const active_token = await Storage.load('active_token');
		const user_id = await Storage.load('user_id');
		const response = await API.get<API.CreateCoinbankResponse>(
			`/coinbank/create/${name}?emoji=${emoji}&cb_id=-1`,
			{
				headers: {
					'User-Id': user_id as string,
					'Token': active_token as string,
				}
			});
		if (!response) {
			throw new API.APIError(500, "No response from server", "createCoinbank.ts", "/coinbank/createCoinbank");
		}
		if (!response.success) {
			throw new API.APIError(response.status, response.message, "createCoinbank.ts", "/coinbank/createCoinbank");
		}

		return response;

	} catch (e: any) {
		if (e instanceof API.APIError) {
			console.error(`[API::createCoinbank] ${e.message}`);
		}
		return undefined;
	}
}

export const createCoinbank = async (name: string, emoji: string) => refresh<API.CreateCoinbankResponse | undefined>((v) => _createcoinbank(v, name, emoji));
