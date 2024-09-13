import b58 from 'bs58check'

import { PUBKEY_PREFIXES } from '../constants'
import { Network } from '../types/database/settings'

export const convertXpub = (
	xpub: string,
	type: keyof typeof PUBKEY_PREFIXES = 'xpub',
	network: Network = 'mainnet'
) => {
	if (network === 'testnet' || network === 'regtest') {
		switch (type) {
			case 'xpub':
				type = 'tpub'
				break
			case 'ypub':
				type = 'upub'
				break
			case 'zpub':
				type = 'vpub'
				break
		}
	}

	xpub = xpub.trim()

	let data = b58.decode(xpub)
	data = data.slice(4)
	data = Buffer.concat([Buffer.from(PUBKEY_PREFIXES[type], 'hex'), data])

	return b58.encode(data)
}
