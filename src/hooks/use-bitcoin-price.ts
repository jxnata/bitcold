import get from 'lodash/get'
import useSWR from 'swr'

import { api } from '../services/api/coincap'
import { Asset } from '../types/api/coincap/asset'

const fetcher = (url: string) => api.get<Asset>(url).then(r => r.data)

const useBitcoinPrice = () => {
	const { data, error } = useSWR(`/assets/bitcoin`, fetcher, { refreshInterval: 60 * 1000 })

	const price: number = get(data, `data.priceUsd`, 0)

	return {
		price,
		loading: !data && !error,
	}
}

export default useBitcoinPrice
