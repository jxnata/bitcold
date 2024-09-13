import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

import { IWalletContext } from './types'
import { settings, storage } from '../../database'
import KEYS from '../../database/types/keys'
import { Wallet } from '../../types/models/wallet'
import { fetchWallet } from '../../utils/fetch-wallet'
import { getWallet } from '../../utils/get-wallet'
import { storeWallet } from '../../utils/store-wallet'

const WalletContext = createContext<IWalletContext | null>(null)

const initialData = () => {
	try {
		const wallet = getWallet()

		return wallet
	} catch {
		storage.clearAll()
	}
}

export function useWallet() {
	const value = useContext(WalletContext)

	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			throw new Error('useWallet must be wrapped in a <WalletProvider />')
		}
	}

	return value as IWalletContext
}

export function WalletProvider(props: PropsWithChildren) {
	const [wallet, setWallet] = useState<Wallet | undefined>(initialData())

	const init = async (type: 'bip44' | 'bip49' | 'bip84' = 'bip84') => {
		const _wallet = await fetchWallet(type)
		setWallet(_wallet)
	}

	const remove = () => {
		storage.delete(KEYS.MASTER_XPUB)
		storage.delete(KEYS.XPUB)
		storage.delete(KEYS.WALLET)
		settings.clearAll()
		setWallet(undefined)
	}

	useEffect(() => {
		init()
	}, [])

	useEffect(() => {
		if (wallet) storeWallet(wallet)
	}, [wallet])

	return (
		<WalletContext.Provider
			value={{
				wallet,
				setWallet,
				mutate: init,
				remove,
			}}
		>
			{props.children}
		</WalletContext.Provider>
	)
}
