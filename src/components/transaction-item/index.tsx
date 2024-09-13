import React, { useCallback } from 'react'

import * as S from './styles'
import { Transaction } from '../../types/api/blockchain/transactions'
import { getTransactionValues } from '../../utils/get-tx-values'
import { satsToBtc } from '../../utils/sats-to-btc'
import { smallHash } from '../../utils/small-hash'

type Props = {
	transaction: Transaction
	onPress: () => void
}

function TransactionItem({ transaction, onPress }: Props) {
	const values = getTransactionValues(transaction)

	const StatusIcon = useCallback(() => {
		if (!transaction.block_index) {
			return <S.PendingIcon name='time-outline' />
		}
		if (values.type === 'receive') {
			return <S.ReceiveIcon name='arrow-down-outline' />
		}
		if (values.type === 'send') {
			return <S.SendIcon name='arrow-up-outline' />
		}

		if (values.type === 'consolidation') {
			return <S.ConsolidationIcon name='sync-outline' />
		}
	}, [transaction.block_index, values.type])

	return (
		<S.Container onPress={onPress}>
			<S.TypeContainer>
				<StatusIcon />
			</S.TypeContainer>
			<S.Row>
				<S.Content>
					<S.Hash>{smallHash(transaction.hash, 6)}</S.Hash>
					<S.Time>{new Date(transaction.time * 1000).toLocaleString()}</S.Time>
				</S.Content>
				<S.Total>{satsToBtc(BigInt(values.amount))} BTC</S.Total>
			</S.Row>
		</S.Container>
	)
}

export default TransactionItem
