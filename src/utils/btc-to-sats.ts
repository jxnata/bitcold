export const btcToSats = (btc: number) => {
	const sats = Math.round(btc * 10 ** 8)
	return BigInt(sats)
}
