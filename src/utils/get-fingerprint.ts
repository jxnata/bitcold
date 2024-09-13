import ecc from '@bitcoinerlab/secp256k1'
import BIP32Factory from 'bip32'

import { byteArrayToHexString } from './byte-array-to-hex-string'
import { convertXpub } from './convert-xpub'
import { NETWORK_TYPES, PUBKEY_PREFIXES } from '../constants'
const bip32 = BIP32Factory(ecc)

export const getFingerprint = (xpub: string, type: keyof typeof PUBKEY_PREFIXES = 'xpub') => {
	return byteArrayToHexString(
		bip32.fromBase58(convertXpub(xpub, type), NETWORK_TYPES[type]).fingerprint
	).toUpperCase()
}
