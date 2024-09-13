import { btcInputValue } from './btc-input-value'

const onChange = jest.fn()

describe('input validation for BTC amount', () => {
	it('should return 0 if string is empty', () => {
		btcInputValue('', onChange)
		expect(onChange).toHaveBeenCalledWith('0')
	})

	it('should replace , to .', () => {
		btcInputValue('0,1', onChange)
		expect(onChange).toHaveBeenCalledWith('0.1')
	})

	it('should remove unnecessary zeros on left', () => {
		btcInputValue('00,1', onChange)
		expect(onChange).toHaveBeenCalledWith('0.1')
	})

	it('should remove extra commas', () => {
		btcInputValue('0,,1', onChange)
		expect(onChange).toHaveBeenCalledWith('0.1')
	})

	it('should remove extra dots', () => {
		btcInputValue('0..1', onChange)
		expect(onChange).toHaveBeenCalledWith('0.1')
	})

	it('should allow max precision to 8 decimals', () => {
		btcInputValue('0.123456789', onChange)
		expect(onChange).toHaveBeenCalledWith('0.12345678')
	})
})
