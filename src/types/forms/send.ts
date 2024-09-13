import { Fee } from '../api/mempool/fee'

export type SendForm = {
	value: number
	to: string
	fee: keyof Fee
}
