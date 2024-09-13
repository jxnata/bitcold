import useSWR from 'swr'

import { api } from '../services/api/mempool'
import { Fee } from '../types/api/mempool/fee'

const fetcher = (url: string) => api.get<Fee>(url).then(r => r.data)

const useFees = () => {
	const { data, error } = useSWR(`/v1/fees/recommended`, fetcher)

	return {
		fees: data,
		loading: !data && !error,
	}
}

export default useFees
