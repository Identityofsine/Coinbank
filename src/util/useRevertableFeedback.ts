type RevertableFeedback<T extends any> = {
	// The current value of the feedback	
	value: T; //must be a copy
	setState: (args: React.SetStateAction<T>) => void;
	promise: (...args: T[]) => Promise<T>;
}

type RevertableFeedbackHook<T> = (new_value: T, display: T) => void

export function useRevertableFeedback<T>({ value, setState, promise }: RevertableFeedback<T>): RevertableFeedbackHook<T> {
	let copy_value = [value];

	const revert = () => {
		setState(copy_value[0]);
	}

	return async (input: T, display: T) => {
		setState(display);
		await promise(input).then((v) => {
			if (v === undefined) {
				revert();
			}
			setState(v);
		}).catch((e) => {
			console.error(e);
			revert();
		});
	}
}
