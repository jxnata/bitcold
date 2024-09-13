export const toHex = (number: number, bytes: number) => {
	const hex = number.toString(16).padStart(bytes * 2, '0')
	return hex.length % 2 !== 0 ? '0' + hex : hex
}
