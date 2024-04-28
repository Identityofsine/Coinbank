export namespace API {

	const baseUrl = "http://localhost:3000";

	export class APIError extends Error {
		constructor(public status: number, public message: string, public source: string, public url: string) {
			super(`API Error ${status} (${source}): ${message}`);
		}

	}


	export async function get<T>(url: string, options: RequestInit = {}): Promise<T | undefined> {
		console.log("Fetching data from API: %s", url);
		try {
			const response = await fetch(baseUrl + url, options);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("[API::get] Error fetching data from API (error: %s, url: %s)", error, url);
		}
	}

	export async function post<T>(url: string, body: string | object, options: RequestInit = {}): Promise<T | undefined> {
		console.log("Fetching data from API: %s", url);
		try {
			if (typeof body === 'object')
				body = JSON.stringify(body);

			const response = await fetch(baseUrl + url, {
				method: 'POST',
				...options,
				headers: {
					'Content-Type': 'application/json',
					...options?.headers ?? {}
				},
				body: body
			});
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("[API::post] Error fetching data from API (%s)", error);
		}
	}

	export type BasicResponse = {
		status: number;
		success: boolean;
		message: string;
	}

	export type LoginRequest = {
		username: string;
		password: string;
	}

	export type LoginResponse = {
		user_id: number;
		active_token: string;
		refresh_token: string;
	} & BasicResponse;

	export type RefreshResponse = {
	} & LoginResponse;

	export type Coinbank = {
		coinbank_id: number;
		name: string;
		emoji: string | null;
		value: number;
		user_secret: boolean;
		created_at: string;
	}

	export type Transaction = {
		transaction_id: number;
		coinbank_id: number;
		user_id: number;
		value: number;
		created_at: Date;
	}

	export type Contribution = {
		user_id: number;
		username: string;
		coinbank_id: number;
		name: string;
		total: number;
	}

	export type GetCoinbanksResponse = {
		coinbanks: Coinbank[];
	} & BasicResponse


	export type GetContributionsResponse = {
		contributions: Contribution[];
	} & BasicResponse

	export type DepositResponse = {
		coinbank_id: number;
		value: number;
	} & BasicResponse

	export type TransactionResponse = {
		transactions: Transaction[];
	} & BasicResponse

}
