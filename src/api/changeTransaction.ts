import { Storage } from "../util/Storage";
import { refresh } from "./refresh";
import { API } from "./request";

async function _transaction(in_refresh: boolean, coinbank_id: string, obj: Partial<API.Transaction>) {
	if (!in_refresh) {
		return false;
	}
	try {
		const active_token = await Storage.load('active_token');
		const user_id = await Storage.load('user_id');
		const response = await API.post<API.BasicResponse>(
			`/coinbank/settransaction`,
			{
				cb_id: parseInt(coinbank_id),
				transaction: obj
			},
			{
				headers: {
					'User-Id': user_id as string,
					'Token': active_token as string,
				}
			});
		if (!response) {
			throw new API.APIError(500, "No response from server", "deposit.ts", "/coinbank/deposit");
		}
		if (!response.success) {
			throw new API.APIError(response.status, response.message, "deposit.ts", "/coinbank/deposit");
		}

		return response.success;

	} catch (e: any) {
		if (e instanceof API.APIError) {
			console.error(`[API::deposit] ${e.message}`);
		}
		return undefined;
	}
}

export const setTransaction = async (coinbank_id: string, obj: Partial<API.Transaction>) => refresh<number | undefined>((v) => _transaction(v, coinbank_id, obj));
