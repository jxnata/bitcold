import ecc from '@bitcoinerlab/secp256k1'
import BIP32Factory from 'bip32'

import { getNetwork } from './get-network'
import { storage } from '../database'
import KEYS from '../database/types/keys'
const bip32 = BIP32Factory(ecc)

export const getPubkeyByIndex = (index: number, change: boolean = false) => {
	const xpub = storage.getString(KEYS.XPUB)!
	const network = getNetwork()

	const node = bip32.fromBase58(xpub, network)
	const childNode = node.derive(change ? 1 : 0).derive(index)

	return childNode.publicKey
}
