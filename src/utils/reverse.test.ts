import * as assert from 'assert'

import { reverse } from './reverse'

describe('reverse a buffer', () => {
	it('should reverse a buffer', () => {
		const src = Buffer.from([1, 2, 3])
		const expected = Buffer.from([3, 2, 1])
		assert.deepStrictEqual(reverse(src), expected)
	})
	it('should reverse an empty buffer', () => {
		const src = Buffer.alloc(0)
		const expected = Buffer.alloc(0)
		assert.deepStrictEqual(reverse(src), expected)
	})
	it('should reverse a single byte buffer', () => {
		const src = Buffer.from([1])
		const expected = Buffer.from([1])
		assert.deepStrictEqual(reverse(src), expected)
	})
})
