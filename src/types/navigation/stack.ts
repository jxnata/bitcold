import { SendTransaction } from '../../utils/create-transaction'
import { Transaction } from '../api/blockchain/transactions'
import { SignedTransaction } from '../models/signed_transaction'

export type StackParamList = {
	home: undefined
	send: undefined
	receive: undefined
	broadcast: {
		send: SendTransaction
		signed: SignedTransaction
	}
	transactions: undefined
	transaction: {
		hash: string
		initialData?: Transaction
	}
	settings: undefined
	'settings/network': undefined
	'settings/type': undefined
	'settings/currency': undefined
	'settings/auth': undefined
	utxo: undefined
	intro: undefined
	auth: {
		setAuth: (auth: boolean) => void
	}
}
