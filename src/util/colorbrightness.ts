export function colorBrightness(color: string | [number, number, number]) {
	let c: [number, number, number];
	if (typeof color === 'string') {
		c = color.match(/\w\w/g)!.map(x => parseInt(x, 16)) as [number, number, number];
	} else {
		c = color;
	}
	const brightness = (c[0] * 299 + c[1] * 587 + c[2] * 114) / 1000;
	return brightness;
}

export function determineColor(color: string | [number, number, number]) {
	return colorBrightness(color) > 148 ? '#000000' : '#ffffff';
}
