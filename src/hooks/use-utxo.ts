import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import useSWR from 'swr'

import { api } from '../services/api/blockchain'
import { UTXO, UTXOResponse } from '../types/api/blockchain/utxo'

const fetcher = (url: string) => api.get<UTXOResponse>(url).then(r => r.data)

const useUTXO = (adresses: string[]) => {
	const { data, error, isLoading, mutate } = useSWR(`/unspent?active=${adresses.join('|')}`, fetcher, {
		isPaused: () => !adresses.length,
	})

	const list: UTXO[] = get(data, `unspent_outputs`, [])
	const utxos: UTXO[] = orderBy(list, ['value'], ['asc'])

	return {
		utxos,
		loading: isLoading,
		error,
		mutate,
	}
}

export default useUTXO
