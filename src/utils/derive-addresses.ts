import ecc from '@bitcoinerlab/secp256k1'
import BIP32Factory from 'bip32'

import { addressByXpub } from './address-by-xpub'
import { getNetwork } from './get-network'
const bip32 = BIP32Factory(ecc)

export const deriveAddresses = (
	xpub: string,
	count: number,
	type: 'bip44' | 'bip49' | 'bip84',
	skip = 0,
	change: boolean = false
) => {
	const addresses: string[] = []
	const network = getNetwork()

	const node = bip32.fromBase58(xpub, network)

	for (let i = skip; i < skip + count; i++) {
		const childNode = node.derive(change ? 1 : 0).derive(i)
		const address = addressByXpub(type, childNode.publicKey)

		if (address) {
			addresses.push(address)
		}
	}

	return addresses
}
