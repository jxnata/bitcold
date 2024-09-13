export const toCurrency = (value: number | bigint | string, symbol?: string, sign?: string) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: symbol || 'USD',
	}).format(Number(value))
}
