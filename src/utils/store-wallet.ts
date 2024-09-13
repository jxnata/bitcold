import { storage } from '../database'
import KEYS from '../database/types/keys'
import { Wallet } from '../types/models/wallet'

export const storeWallet = (wallet: Wallet) => {
	storage.set(KEYS.WALLET, JSON.stringify(wallet))
}
