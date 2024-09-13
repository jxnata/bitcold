import { getWallet } from './get-wallet'

export const getAddressIndex = (address: string) => {
	const wallet = getWallet()

	if (!wallet) throw new Error('Wallet not found')

	const addresses = wallet.addresses || []
	const change_addresses = wallet.change_addresses || []

	let is_change = false
	let index = addresses.findIndex(a => a === address)

	if (index < 0) {
		index = change_addresses.findIndex(a => a === address)
		is_change = true
	}

	return { index, is_change }
}
