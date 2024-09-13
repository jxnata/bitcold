import * as bitcoin from 'bitcoinjs-lib'

import { getNetwork } from './get-network'
import { settings } from '../database'

jest.mock('../database', () => ({
	settings: {
		getString: jest.fn(),
	},
}))

const sut = settings.getString as jest.Mock

describe('return current network', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should return testnet network when network is set to testnet', () => {
		sut.mockReturnValue('testnet')

		const result = getNetwork()

		expect(result).toEqual(bitcoin.networks.testnet)
	})

	it('should return mainnet network when network is not set', () => {
		sut.mockReturnValue(null)

		const result = getNetwork()

		expect(result).toEqual(bitcoin.networks.bitcoin)
	})

	it('should return regtest network when network is set to regtest', () => {
		sut.mockReturnValue('regtest')

		const result = getNetwork()

		expect(result).toEqual(bitcoin.networks.regtest)
	})
})
