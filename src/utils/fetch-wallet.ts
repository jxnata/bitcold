import { deriveAddresses } from './derive-addresses'
import { getBalances } from './get-balances'
import { storage } from '../database'
import KEYS from '../database/types/keys'
import { Wallet } from '../types/models/wallet'

export const fetchWallet = async (type: 'bip44' | 'bip49' | 'bip84' = 'bip84') => {
	const xpub = storage.getString(KEYS.XPUB)

	if (!xpub) return

	const main_wallet = await getBalances(xpub, type)
	const change_wallet = await getBalances(xpub, type, true)

	if (!main_wallet || !change_wallet) return

	const addresses = deriveAddresses(xpub, main_wallet.index, type, 0, false)
	const change_addresses = deriveAddresses(xpub, change_wallet.index, type, 0, true)

	const wallet: Wallet = {
		addresses,
		change_addresses,
		balance: Number(main_wallet.balance + change_wallet.balance),
		xpub,
		type,
		last_sync: Date.now(),
		next_index: main_wallet.index,
		next_change_index: change_wallet.index,
	}

	return wallet
}
