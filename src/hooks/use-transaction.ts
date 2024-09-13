import useSWR from 'swr'

import { api } from '../services/api/blockchain'
import { Transaction } from '../types/api/blockchain/transactions'

const fetcher = (url: string) => api.get<Transaction>(url).then(r => r.data)

const useTransaction = (hash: string, initialData?: Transaction) => {
	const { data, error, mutate } = useSWR(`/rawtx/${hash}`, fetcher, {
		isPaused: () => !hash,
		fallbackData: initialData,
	})

	return {
		transaction: data,
		loading: !data && !error,
		error,
		mutate,
	}
}

export default useTransaction
