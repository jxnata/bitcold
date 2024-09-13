import { satsToBtc } from './sats-to-btc'

describe('convert sats to btc', () => {
	it('should convert 100,000,000 sats to 1 BTC', () => {
		expect(satsToBtc(100000000n)).toBe('1')
	})

	it('should convert 0 sats to 0 BTC', () => {
		expect(satsToBtc(0n)).toBe('0')
	})

	it('should convert 42 sats to 0.000000042 BTC', () => {
		expect(satsToBtc(42n)).toBe('0.00000042')
	})

	it('should convert -42 sats to -0.000000042 BTC', () => {
		expect(satsToBtc(-42n)).toBe('-0.00000042')
	})
})
