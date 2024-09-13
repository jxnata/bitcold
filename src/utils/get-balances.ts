import sum from 'lodash/sum'

import { deriveAddresses } from './derive-addresses'
import { api } from '../services/api/blockchain'
import { BalanceResponse } from '../types/api/blockchain/balance'

let finished = false
let index = 0
let last_used = 0
let page = 0
let page_balances: bigint[] = []

export const getBalances = async (
	xpub: string,
	type: 'bip44' | 'bip49' | 'bip84' = 'bip84',
	change: boolean = false
) => {
	try {
		const processPage = async () => {
			let balance = 0n
			const derived = deriveAddresses(xpub, 10, type, page * 10, change)
			const { data } = await api.get<BalanceResponse>(`/balance?active=${derived.join('|')}`)

			if (!data) return

			for (const address of derived) {
				index++
				if (data[address]) {
					if (data[address].n_tx > 0) {
						last_used = index
					}
					balance += BigInt(data[address].final_balance)
				}
			}
			page_balances.push(balance)

			if (page_balances[page] === 0n) {
				finished = true
			}

			page++
			balance = 0n

			if (!finished) {
				await processPage()
			}
		}

		await processPage()

		const total = BigInt(sum(page_balances))
		const last_index = last_used

		page_balances = []
		last_used = 0
		finished = false
		index = 0
		page = 0

		return {
			balance: total,
			index: last_index,
		}
	} catch {
		throw new Error('Error to derive addresses')
	}
}
