export namespace API {

	const baseUrl = "http://localhost:3000";

	export async function get<T>(url: string): Promise<T | undefined> {
		try {
			const response = await fetch(baseUrl + url);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("[API::get] Error fetching data from API (%s)", error);
		}
	}

	export async function post<T>(url: string, body: string | object): Promise<T | undefined> {
		console.log("POST %s", baseUrl + url);
		try {
			if (typeof body === 'object')
				body = JSON.stringify(body);

			const response = await fetch(baseUrl + url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
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

}
