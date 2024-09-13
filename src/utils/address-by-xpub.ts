import * as bitcoin from 'bitcoinjs-lib'

import { getNetwork } from './get-network'

export const addressByXpub = (type: 'bip44' | 'bip49' | 'bip84', pubkey: Buffer) => {
	try {
		const network = getNetwork()

		if (type === 'bip44') {
			return bitcoin.payments.p2pkh({ pubkey, network }).address
		}
		if (type === 'bip49') {
			return bitcoin.payments.p2sh({
				redeem: bitcoin.payments.p2wpkh({ pubkey, network }),
			}).address
		}
		if (type === 'bip84') {
			return bitcoin.payments.p2wpkh({ pubkey, network }).address
		}
	} catch {
		throw new Error('Invalid type or pubkey')
	}
}
