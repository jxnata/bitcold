export const byteArrayToHexString = (byteArray: Buffer) => {
	return Array.from(byteArray, function (byte) {
		return ('0' + (byte & 0xff).toString(16)).slice(-2)
	}).join('')
}
