export const satsToBtc = (sats: bigint) => {
	const btc = Number(sats) / 10 ** 8
	return btc.toLocaleString('en-US', { maximumFractionDigits: 8 })
}
