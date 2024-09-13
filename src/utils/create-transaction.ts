import { calculateVirtualSize } from './calculate-virtual-size'
import { createInitialPSBT } from './create-initial-psbt'
import { deriveAddress } from './derive-address'
import { getWallet } from './get-wallet'
import { inputsToFill } from './inputs-to-fill'
import { storage } from '../database'
import KEYS from '../database/types/keys'
import { UTXO } from '../types/api/blockchain/utxo'

export const createTransaction = (data: SendTransaction, utxos: UTXO[]) => {
	const xpub = storage.getString(KEYS.XPUB)!
	const wallet = getWallet()!
	const utxos_to_fill = inputsToFill(utxos, data.value)
	const utxo_total = utxos_to_fill.reduce((a, b) => a + b.value, 0)

	const temp = createInitialPSBT({ ...data, value: BigInt(utxo_total) }, utxos_to_fill)

	const fee = calculateVirtualSize(temp) * data.fee

	const value = Number(data.value)

	const change = utxo_total - value - fee

	const psbt = createInitialPSBT(data, utxos_to_fill)

	const change_address = deriveAddress(xpub, wallet?.next_change_index, wallet.type, true)!

	psbt.addOutput({
		address: change_address,
		value: change,
	})

	return psbt
}

export type SendTransaction = {
	value: bigint
	to: string
	fee: number
}
