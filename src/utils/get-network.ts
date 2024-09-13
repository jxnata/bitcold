import * as bitcoin from 'bitcoinjs-lib'

import { settings } from '../database'
import KEYS from '../database/types/keys'
import { Network } from '../types/database/settings'

export const getNetwork = () => {
	const network = (settings.getString(KEYS.SETTINGS.NETWORK) as Network) || 'mainnet'

	switch (network) {
		case 'testnet':
			return bitcoin.networks.testnet
		case 'mainnet':
			return bitcoin.networks.bitcoin
		case 'regtest':
			return bitcoin.networks.regtest
		default:
			return bitcoin.networks.bitcoin
	}
}
