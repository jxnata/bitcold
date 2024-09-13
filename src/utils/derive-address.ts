import ecc from '@bitcoinerlab/secp256k1'
import BIP32Factory from 'bip32'

import { addressByXpub } from './address-by-xpub'
import { getNetwork } from './get-network'
const bip32 = BIP32Factory(ecc)

export const deriveAddress = (
	xpub: string,
	index: number,
	type: 'bip44' | 'bip49' | 'bip84',
	change: boolean = false
) => {
	const network = getNetwork()

	const node = bip32.fromBase58(xpub, network)

	const childNode = node.derive(change ? 1 : 0).derive(index)
	const address = addressByXpub(type, childNode.publicKey)

	return address
}
