export const btcUrlDecode = (btc_url: string) => {
	const bitcoinInfo: BitcoinInfo = { address: '', amount: '', label: '' }
	if (btc_url.startsWith('bitcoin:')) {
		const start = btc_url.indexOf(':') + 1
		const end = btc_url.indexOf('?') !== -1 ? btc_url.indexOf('?') : btc_url.length
		bitcoinInfo.address = btc_url.substring(start, end)

		const params = new URLSearchParams(btc_url.substring(end))

		if (params.has('amount')) {
			bitcoinInfo.amount = params.get('amount')!
		}
		if (params.has('label')) {
			bitcoinInfo.label = params.get('label')!
		}
	} else {
		throw new Error('Invalid BTC url')
	}

	return bitcoinInfo
}

type BitcoinInfo = {
	address: string
	amount: string
	label: string
}
