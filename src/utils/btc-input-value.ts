export const btcInputValue = (value: string, onChange: (value: string) => void) => {
	if (!value) return onChange('0')

	value = value.replace(',', '.')

	if (value.includes('.')) {
		const [integer, fraction] = value.split('.')
		if (fraction) {
			value = Number(integer).toString() + '.' + fraction.substring(0, 8)
		}
	} else {
		if (Number(value) === 0) return onChange('0')

		return onChange(Number(value).toString())
	}

	onChange(value.replace(/(0+)(?=,)/g, '0'))
}
