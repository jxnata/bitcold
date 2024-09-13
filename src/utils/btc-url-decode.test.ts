import { btcUrlDecode } from './btc-url-decode'

describe('decode btc url', () => {
	it('should correctly decode btc url', () => {
		const btcUrl = 'bitcoin:bc1qyx5k03n82w483qnj92qjr4nwj39262x3qh84s8?amount=1.5&label=foo'
		const decoded = btcUrlDecode(btcUrl)
		expect(decoded).toEqual({
			address: 'bc1qyx5k03n82w483qnj92qjr4nwj39262x3qh84s8',
			amount: '1.5',
			label: 'foo',
		})
	})

	it('should correctly decode btc url without amount', () => {
		const btcUrl = 'bitcoin:bc1qyx5k03n82w483qnj92qjr4nwj39262x3qh84s8?label=foo'
		const decoded = btcUrlDecode(btcUrl)
		expect(decoded).toEqual({
			address: 'bc1qyx5k03n82w483qnj92qjr4nwj39262x3qh84s8',
			amount: '',
			label: 'foo',
		})
	})

	it('should correctly decode btc url without label', () => {
		const btcUrl = 'bitcoin:bc1qyx5k03n82w483qnj92qjr4nwj39262x3qh84s8?amount=1.5'
		const decoded = btcUrlDecode(btcUrl)
		expect(decoded).toEqual({
			address: 'bc1qyx5k03n82w483qnj92qjr4nwj39262x3qh84s8',
			amount: '1.5',
			label: '',
		})
	})

	it('should correctly decode btc url without both label and amount', () => {
		const btcUrl = 'bitcoin:bc1qyx5k03n82w483qnj92qjr4nwj39262x3qh84s8'
		const decoded = btcUrlDecode(btcUrl)
		expect(decoded).toEqual({
			address: 'bc1qyx5k03n82w483qnj92qjr4nwj39262x3qh84s8',
			amount: '',
			label: '',
		})
	})
})
