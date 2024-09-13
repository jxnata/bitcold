import { btcToSats } from './btc-to-sats'

describe('btc to sats', () => {
	it('converts 1 BTC to 100,000,000 satoshis', () => {
		expect(btcToSats(1)).toBe(100000000n)
	})

	it('converts 0.00000001 BTC to 1 satoshis', () => {
		expect(btcToSats(0.00000001)).toBe(1n)
	})

	it('converts -1 BTC to -100,000,000 satoshis', () => {
		expect(btcToSats(-1)).toBe(-100000000n)
	})

	it('converts 0 BTC to 0 satoshis', () => {
		expect(btcToSats(0)).toBe(0n)
	})
})
