import { CoinbankContextType } from "../screens/Screen";

export namespace ContextFunctions {

	export function getUserName(context: Partial<CoinbankContextType>, user_id: number): string {
		let user = "UNKNOWN";
		if (!context.coinbanks) return user;
		context.coinbanks.forEach((coinbank) => {
			coinbank.contributer?.forEach((contributer) => {
				if (contributer.user_id === user_id) {
					user = contributer.username;
				}
			})
		});
		return user;
	}
}
