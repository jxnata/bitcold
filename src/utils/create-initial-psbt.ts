import * as bitcoin from 'bitcoinjs-lib'

import { SendTransaction } from './create-transaction'
import { getAddressIndex } from './get-address-index'
import { getFingerprint } from './get-fingerprint'
import { getNetwork } from './get-network'
import { getPathByIndex } from './get-path-by-index'
import { getPubkeyByIndex } from './get-pubkey-by-index'
import { getWallet } from './get-wallet'
import { storage } from '../database'
import KEYS from '../database/types/keys'
import { UTXO } from '../types/api/blockchain/utxo'

export const createInitialPSBT = (data: SendTransaction, utxos: UTXO[]) => {
	const network = getNetwork()
	const master_xpub = storage.getString(KEYS.MASTER_XPUB)!
	const wallet = getWallet()

	if (!wallet) throw new Error('Wallet not found')

	const psbt = new bitcoin.Psbt({ network })
	psbt.setVersion(2)
	psbt.setLocktime(0)

	for (const input of utxos) {
		const address = bitcoin.address.fromOutputScript(Buffer.from(input.script, 'hex'), network)
		const { index, is_change } = getAddressIndex(address)
		const path = getPathByIndex(index, wallet.type, is_change)
		const pubkey = getPubkeyByIndex(index, is_change)

		psbt.addInput({
			hash: input.tx_hash_big_endian,
			index: input.tx_output_n,
			witnessUtxo: {
				script: Buffer.from(input.script, 'hex'),
				value: input.value,
			},
			bip32Derivation: [
				{
					masterFingerprint: Buffer.from(getFingerprint(master_xpub), 'hex'),
					pubkey,
					path,
				},
			],
		})
	}

	psbt.addOutput({
		address: data.to,
		script: bitcoin.address.toOutputScript(data.to, network),
		value: Number(data.value),
	})

	return psbt
}
