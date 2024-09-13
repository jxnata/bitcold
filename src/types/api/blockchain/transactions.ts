type Info = {
	nconnected: number
	conversion: number
	currency: string
}

type Address = {
	address: string
	final_balance: number
	n_tx: number
	total_received: number
	total_sent: number
}

type Wallet = {
	final_balance: number
	n_tx: number
	n_tx_filtered: number
	total_received: number
	total_sent: number
}

type Input = {
	sequence: number
	witness: string
	script: string
	index: number
	prev_out: PrevOut
}

type PrevOut = {
	addr: string
	n: number
	script: string
	spending_outpoints: SpendingOutpoint[]
	spent: boolean
	tx_index: number
	type: number
	value: number
}

type SpendingOutpoint = {
	n: number
	tx_index: number
}

type Output = {
	type: number
	spent: boolean
	value: number
	spending_outpoints: SpendingOutpoint[]
	n: number
	tx_index: number
	script: string
	addr: string
}

export type Transaction = {
	hash: string
	ver: number
	vin_sz: number
	vout_sz: number
	size: number
	weight: number
	fee: number
	relayed_by: string
	lock_time: number
	tx_index: number | null
	double_spend: boolean
	time: number
	block_index: number | null
	block_height: number | null
	inputs: Input[]
	out: Output[]
	result: number
	balance: number
}

export type BlockchainInfoResponse = {
	info: Info
	addresses: Address[]
	wallet: Wallet
	txs: Transaction[]
}
