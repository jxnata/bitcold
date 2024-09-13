export const BLOCKCHAIN_API_URL = 'https://blockchain.info'
export const PRICES_API_URL = 'https://api.coincap.io/v2'
export const MEMPOOL_API_URL = 'https://mempool.space/api'
export const STORAGE_ENCRYPT_KEY = process.env.STORAGE_ENCRYPT_KEY

export const PUBKEY_PREFIXES = {
	xpub: '0488b21e',
	ypub: '049d7cb2',
	Ypub: '0295b43f',
	zpub: '04b24746',
	Zpub: '02aa7ed3',
	tpub: '043587cf',
	upub: '044a5262',
	Upub: '024289ef',
	vpub: '045f1cf6',
	Vpub: '02575483',
}

export const NETWORK_TYPES = {
	xpub: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'bc',
		bip32: {
			public: 0x0488b21e,
			private: 0x0488ade4,
		},
		pubKeyHash: 0x00,
		scriptHash: 0x05,
		wif: 0x80,
	},
	ypub: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'bc',
		bip32: {
			public: 0x049d7cb2,
			private: 0x049d7878,
		},
		pubKeyHash: 0x00,
		scriptHash: 0x05,
		wif: 0x80,
	},
	Ypub: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'bc',
		bip32: {
			public: 0x0295b43f,
			private: 0x0295b005,
		},
		pubKeyHash: 0x00,
		scriptHash: 0x05,
		wif: 0x80,
	},
	zpub: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'bc',
		bip32: {
			public: 0x04b24746,
			private: 0x04b2430c,
		},
		pubKeyHash: 0x00,
		scriptHash: 0x05,
		wif: 0x80,
	},
	Zpub: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'bc',
		bip32: {
			public: 0x02aa7ed3,
			private: 0x02aa7a99,
		},
		pubKeyHash: 0x00,
		scriptHash: 0x05,
		wif: 0x80,
	},
	tpub: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'tb',
		bip32: {
			public: 0x043587cf,
			private: 0x04358394,
		},
		pubKeyHash: 0x6f,
		scriptHash: 0xc4,
		wif: 0xef,
	},
	upub: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'tb',
		bip32: {
			public: 0x044a5262,
			private: 0x044a4e28,
		},
		pubKeyHash: 0x6f,
		scriptHash: 0xc4,
		wif: 0xef,
	},
	Upub: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'tb',
		bip32: {
			public: 0x024289ef,
			private: 0x024285b5,
		},
		pubKeyHash: 0x6f,
		scriptHash: 0xc4,
		wif: 0xef,
	},
	vpub: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'tb',
		bip32: {
			public: 0x045f1cf6,
			private: 0x045f18bc,
		},
		pubKeyHash: 0x6f,
		scriptHash: 0xc4,
		wif: 0xef,
	},
	Vpub: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'tb',
		bip32: {
			public: 0x02575483,
			private: 0x02575048,
		},
		pubKeyHash: 0x6f,
		scriptHash: 0xc4,
		wif: 0xef,
	},
}

export const PATHS = {
	bip44: "m/44'/0'/0'",
	bip49: "m/49'/0'/0'",
	bip84: "m/84'/0'/0'",
}
