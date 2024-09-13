import { ImportedWallet } from '../types/models/imported_wallet'

export const getImportedWalletFromJSON = (data: string, type: 'bip44' | 'bip49' | 'bip84' = 'bip84') => {
	const json: ImportedWallet = JSON.parse(data)

	return json
}
