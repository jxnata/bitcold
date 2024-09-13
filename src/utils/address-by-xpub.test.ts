import { addressByXpub } from './address-by-xpub'

describe('generate address by xpub', () => {
	it('should create a p2pkh address when type is bip44', () => {
		const result = addressByXpub(
			'bip44',
			Buffer.from('0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798', 'hex')
		)!
		expect(result).toBeDefined()
		expect(result.substring(0, 1)).toBe('1')
	})

	it('should create a p2sh address when type is bip49', () => {
		const result = addressByXpub(
			'bip49',
			Buffer.from('0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798', 'hex')
		)!
		expect(result).toBeDefined()
		expect(result.substring(0, 1)).toBe('3')
	})

	it('should create a p2wpkh address when type is bip84', () => {
		const result = addressByXpub(
			'bip84',
			Buffer.from('0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798', 'hex')
		)!
		expect(result).toBeDefined()
		expect(result.substring(0, 4)).toBe('bc1q')
	})

	it('should throw error when pubkey is invalid', () => {
		expect(() =>
			addressByXpub(
				'bip84',
				Buffer.from('0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81hhh', 'hex')
			)
		).toThrow('Invalid type or pubkey')
	})
})
