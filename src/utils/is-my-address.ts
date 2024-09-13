import { getWallet } from './get-wallet'

export const isMyAddress = (address: string): { result: boolean; type: 'main' | 'change' | '' } => {
	const wallet = getWallet()

	if (!wallet) return { result: false, type: '' }

	const is_main = wallet.addresses.findIndex(a => a === address) !== -1

	if (is_main) return { result: true, type: 'main' }

	const is_change = wallet.change_addresses.findIndex(a => a === address) !== -1

	if (is_change) return { result: true, type: 'change' }

	return { result: false, type: '' }
}
