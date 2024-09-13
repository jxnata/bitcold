export type Rate = {
	id: string
	symbol: string
	currencySymbol: string
	type: 'fiat' | 'crypto'
	rateUsd: string
}
