import { storage } from '../database'
import KEYS from '../database/types/keys'
import { Wallet } from '../types/models/wallet'

export const getWallet = () => {
	const wallet_str = storage.getString(KEYS.WALLET)

	if (wallet_str) {
		const wallet: Wallet = JSON.parse(wallet_str)
		return wallet
	}
}
