import { UTXO } from '../types/api/blockchain/utxo'

export const inputsToFill = (utxos: UTXO[], value: bigint) => {
	let filled = false
	let total = 0
	let i = 0
	const inputs: UTXO[] = []

	while (!filled) {
		if (!utxos[i]) break
		if (utxos[i].confirmations <= 0) {
			i++
			continue
		}

		total += utxos[i].value

		if (total >= value) {
			filled = true
		}

		inputs.push(utxos[i])
		i++
	}

	return inputs
}
