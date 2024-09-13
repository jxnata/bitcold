import { smallHash } from './small-hash'

const address = 'bc1q3gknk4dqypzczpeqc0uqkpts3l62ewqc96kux0'
const hash = '4e32207606226945c410eb840eb02b8400ec198b93ec65dd54ae60c94928c9f8'

describe('smallHash', () => {
	it('should shorten a bitcoin address', () => {
		expect(smallHash(address, 8)).toBe('bc1q3gkn...qc96kux0')
	})
	it('should shorten a transaction hash', () => {
		expect(smallHash(hash, 8)).toBe('4e322076...4928c9f8')
	})
	it('should show full string if the lenght is smaller than size', () => {
		expect(smallHash('4e322076062269', 8)).toBe('4e322076062269')
	})
	it('should show full string if the lenght is equal than size', () => {
		expect(smallHash('4e32207606226945', 8)).toBe('4e32207606226945')
	})
})
