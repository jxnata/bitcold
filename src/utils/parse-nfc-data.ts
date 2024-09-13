export const parseNfcData = (payload: number[]) => {
	const xpub_string = String.fromCharCode.apply(null, payload)

	if (!xpub_string.startsWith('{')) return xpub_string.slice(3)

	return xpub_string.trim()
}
