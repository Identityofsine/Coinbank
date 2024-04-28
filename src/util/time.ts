export namespace TimeFormat {
	export function formatTime(created_at: Date): string {
		//difference between now and created_at
		const now = new Date();

		const diff = now.getTime() - created_at.getTime();
		const day = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor(diff / (1000 * 60 * 60));
		const minutes = Math.floor(diff / (1000 * 60));
		const seconds = Math.floor(diff / 1000);
		let result = '';

		if (day > 0) {
			result += `${day} day${day === 1 ? '' : 's'} ago`;
			return result;
		}
		if (hours > 0) {
			result += `${hours} hour${hours === 1 ? '' : 's'} ago`;
			return result;
		}
		if (minutes > 0) {
			result += `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
			return result;
		}
		if (seconds > 15) {
			result += `${seconds} second${seconds === 1 ? '' : 's'} ago`;
			return result;
		}
		return 'Just now';
	}
}
