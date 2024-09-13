import filter from 'lodash/filter'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import { useCallback } from 'react'
import useSWR from 'swr'

import { api } from '../services/api/coincap'
import { Rate } from '../types/api/coincap/rate'
import { toCurrency } from '../utils/to-currency'

const fetcher = (url: string) => api.get<{ data: Rate[] }>(url).then(r => r.data)

const useRates = (currency: string = 'USD') => {
	const { data, error } = useSWR(`/rates`, fetcher)

	const rates: Rate[] = sortBy(filter(get(data, `data`, []), ['type', 'fiat']), 'symbol')

	const fiat = useCallback(
		(value: number | string | bigint) => {
			const rate = rates.find(r => r.symbol === currency)

			if (!rate) return toCurrency(value)

			return toCurrency(Number(value) / Number(rate.rateUsd), rate.symbol, rate.currencySymbol)
		},
		[currency, rates]
	)

	return {
		rates,
		fiat,
		loading: !data && !error,
	}
}

export default useRates
