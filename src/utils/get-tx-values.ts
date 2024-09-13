import { isMyAddress } from './is-my-address'
import { Transaction } from '../types/api/blockchain/transactions'

type InOut = { address: string; amount: bigint }

export const getTransactionValues = (tx: Transaction) => {
	let inputs_total = 0
	let outputs_total = 0
	let my_inputs_total = 0
	let my_outputs_total = 0
	let change_total = 0
	let type: 'receive' | 'send' | 'consolidation'
	let amount = 0
	const inputs: InOut[] = []
	const outputs: InOut[] = []
	let change_address = ''

	tx.inputs.forEach(input => {
		inputs_total = inputs_total + input.prev_out.value
		inputs.push({ address: input.prev_out.addr, amount: BigInt(input.prev_out.value) })

		const { result } = isMyAddress(input.prev_out.addr)
		if (result) my_inputs_total = my_inputs_total + input.prev_out.value
	})

	tx.out.forEach(output => {
		outputs_total = outputs_total + output.value

		const { result, type } = isMyAddress(output.addr)
		if (result) my_outputs_total = my_outputs_total + output.value

		if (type === 'change' || inputs.findIndex(i => i.address === output.addr) !== -1) {
			change_address = output.addr
			change_total = change_total + output.value
		} else {
			outputs.push({ address: output.addr, amount: BigInt(output.value) })
		}
	})

	if (outputs_total === change_total && my_inputs_total > 0) {
		type = 'consolidation'
		amount = my_outputs_total
	} else if (my_outputs_total > my_inputs_total) {
		type = 'receive'
		amount = my_outputs_total
	} else {
		type = 'send'
		amount = my_inputs_total - change_total
	}

	return {
		type,
		amount,
		change_address,
		inputs,
		outputs,
	}
}
