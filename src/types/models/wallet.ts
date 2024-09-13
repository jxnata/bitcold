export type Wallet = {
	addresses: string[]
	change_addresses: string[]
	balance: number
	xpub: string
	type: 'bip44' | 'bip49' | 'bip84'
	last_sync: number
	next_index: number
	next_change_index: number
}
