const prefixMap = {
	bip44: "m/44'/0'/0'",
	bip49: "m/49'/0'/0'",
	bip84: "m/84'/0'/0'",
}

export const getPath = (type: 'bip44' | 'bip49' | 'bip84' = 'bip84') => {
	return prefixMap[type]
}
