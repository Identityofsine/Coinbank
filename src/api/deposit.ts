import { Storage } from "../util/Storage";
import { sleep } from "../util/sleep";
import { refresh } from "./refresh";
import { API } from "./request";

async function _deposit(in_refresh: boolean, coinbank_id: string, amount: string) {
	if (!in_refresh) {
		return false;
	}
	try {
		const active_token = await Storage.load('active_token');
		const user_id = await Storage.load('user_id');
		const response = await API.get<API.DepositResponse>(
			`/coinbank/deposit/${amount}?cb_id=${coinbank_id}`,
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

		return response.value;

	} catch (e: any) {
		if (e instanceof API.APIError) {
			console.error(`[API::deposit] ${e.message}`);
		}
		return undefined;
	}
}

export const deposit = async (coinbank_id: string, amount: string) => refresh<number | undefined>((v) => _deposit(v, coinbank_id, amount));
