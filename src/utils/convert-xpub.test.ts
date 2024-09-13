import { convertXpub } from './convert-xpub'

const xpub =
	'xpub69gC3ozZvFRkSsKonPuWLWEGzEYEhRNrKBW6kgTBiXH4AQt49FvHoigSechDQUVEfx5xEFtKuUGHmnmD2jxBY1krxsNmq1xYPSZ1k23h9WB'

describe('convert xpub to some types', () => {
	it('should change xpub to tpub in testnet', () => {
		expect(convertXpub(xpub, 'xpub', 'testnet').substring(0, 4)).toBe('tpub')
	})

	it('should change ypub to upub in testnet', () => {
		expect(convertXpub(xpub, 'ypub', 'testnet').substring(0, 4)).toBe('upub')
	})

	it('should change zpub to vpub in testnet', () => {
		expect(convertXpub(xpub, 'zpub', 'testnet').substring(0, 4)).toBe('vpub')
	})

	it('should change xpub to tpub in regtest', () => {
		expect(convertXpub(xpub, 'xpub', 'regtest').substring(0, 4)).toBe('tpub')
	})

	it('should change ypub to upub in regtest', () => {
		expect(convertXpub(xpub, 'ypub', 'regtest').substring(0, 4)).toBe('upub')
	})

	it('should change zpub to vpub in regtest', () => {
		expect(convertXpub(xpub, 'zpub', 'regtest').substring(0, 4)).toBe('vpub')
	})

	it('should not change xpub in mainnet', () => {
		expect(convertXpub(xpub, 'xpub', 'mainnet').substring(0, 4)).toBe('xpub')
	})

	it('should not change ypub in mainnet', () => {
		expect(convertXpub(xpub, 'ypub', 'mainnet').substring(0, 4)).toBe('ypub')
	})

	it('should not change zpub in mainnet', () => {
		expect(convertXpub(xpub, 'zpub', 'mainnet').substring(0, 4)).toBe('zpub')
	})
})
