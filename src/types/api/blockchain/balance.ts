export type BalanceResponse = {
	[address: string]: Balance
}

export type Balance = {
	final_balance: number
	n_tx: number
	total_received: number
}
