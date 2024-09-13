import get from 'lodash/get'
import useSWR from 'swr'

import { api } from '../services/api/blockchain'
import { BlockchainInfoResponse, Transaction } from '../types/api/blockchain/transactions'

const fetcher = (url: string) => api.get<BlockchainInfoResponse>(url).then(r => r.data)

const useTransactions = (adresses: string[]) => {
	const { data, error, isLoading, mutate } = useSWR(`/multiaddr?active=${adresses.join('|')}`, fetcher, {
		isPaused: () => !adresses.length,
	})

	const transactions: Transaction[] = get(data, `txs`, [])

	return {
		transactions,
		loading: isLoading,
		error,
		mutate,
	}
}

export default useTransactions
