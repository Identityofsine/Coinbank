import AsyncStorage from "@react-native-async-storage/async-storage";

export namespace Storage {
	export async function save(key: string, value: string | number | object) {
		try {
			if (typeof value === 'object')
				value = JSON.stringify(value);
			await AsyncStorage.setItem(key, `${value}`);
		} catch (error) {
			console.error("[Storage::save] Error saving data into storage (%s)", error)
		}
	}

	export async function load(key: string) {
		try {
			const value = await AsyncStorage.getItem(key);
			if (value === null)
				return null;
			return value;
		} catch (error) {
			console.error("[Storage::load] Error loading data from storage (%s)", error)
		}
	}
}
