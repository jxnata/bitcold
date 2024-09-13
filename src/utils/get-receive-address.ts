import { deriveAddress } from './derive-address'
import { getWallet } from './get-wallet'

export const getReceiveAddress = () => {
	const wallet = getWallet()!

	const address = deriveAddress(wallet.xpub, wallet.next_index, 'bip84')

	return address!
}
