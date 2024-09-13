import * as bitcoin from 'bitcoinjs-lib'

export const calculateVirtualSize = (psbt: bitcoin.Psbt, includeChange = true) => {
	const changeIncluded = includeChange ? 1 : 0

	const baseSize = psbt.data.inputs.length * 148 + (psbt.data.outputs.length + changeIncluded) * 34 + 10

	const witnessSize = psbt.data.inputs.reduce((total, input) => {
		if (input.witnessUtxo) {
			return total + input.witnessUtxo.script.length + 4
		} else {
			return total + 107
		}
	}, 0)

	const totalSize = baseSize + witnessSize

	return totalSize
}
