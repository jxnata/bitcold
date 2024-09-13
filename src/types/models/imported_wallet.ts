export type ImportedWallet = {
	chain: string
	xfp: string
	account: number
	xpub: string
	bip44: {
		name: string
		xfp: string
		deriv: string
		xpub: string
		desc: string
		first: string
	}
	bip49: {
		name: string
		xfp: string
		deriv: string
		xpub: string
		desc: string
		_pub: string
		first: string
	}
	bip84: {
		name: string
		xfp: string
		deriv: string
		xpub: string
		desc: string
		_pub: string
		first: string
	}
	bip48_1: {
		name: string
		xfp: string
		deriv: string
		xpub: string
		desc: string
		_pub: string
	}
	bip48_2: {
		name: string
		xfp: string
		deriv: string
		xpub: string
		desc: string
		_pub: string
	}
	bip45: {
		name: string
		xfp: string
		deriv: string
		xpub: string
		desc: string
	}
}
