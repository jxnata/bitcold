import { byteArrayToHexString } from './byte-array-to-hex-string'

describe('convert byte array to hex string', () => {
	it('should convert a non-empty buffer to a correct hexadecimal string representation', () => {
		const buffer = Buffer.from([0x01, 0xab, 0xff])
		const hexString = byteArrayToHexString(buffer)
		expect(hexString).toEqual('01abff')
	})

	it('should handle an empty buffer and return an empty string', () => {
		const buffer = Buffer.alloc(0)
		const hexString = byteArrayToHexString(buffer)
		expect(hexString).toEqual('')
	})

	it('should handle non-standard byte values correctly, including maximum and minimum possible byte values', () => {
		const buffer = Buffer.from([0x00, 0xff, 0x80, 0x7f])
		const hexString = byteArrayToHexString(buffer)
		expect(hexString).toEqual('00ff807f')
	})
})
