import { Wallet } from '../../types/models/wallet'

export type IWalletContext = {
	setWallet: (_: Wallet) => void
	mutate: (type?: 'bip44' | 'bip49' | 'bip84') => void
	remove: () => void
	wallet?: Wallet
}
