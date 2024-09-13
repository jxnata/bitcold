import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Loading from '../../components/loading'
import TransactionItem from '../../components/transaction-item'
import { useWallet } from '../../contexts/wallet'
import useTransactions from '../../hooks/use-transactions'
import { Container } from '../../theme/global'

function Transactions({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'transactions' })
	const { wallet } = useWallet()

	const { transactions, loading, mutate } = useTransactions(wallet ? wallet.addresses : [])

	if (!wallet) return <Loading />

	return (
		<Container>
			<Header title={t('title')} />
			<S.Content>
				<FlatList
					data={transactions}
					keyExtractor={item => item.hash}
					refreshControl={<RefreshControl onRefresh={mutate} refreshing={loading} />}
					renderItem={({ item }) => (
						<TransactionItem
							transaction={item}
							onPress={() => navigation.navigate('transaction', { hash: item.hash, initialData: item })}
						/>
					)}
					showsVerticalScrollIndicator={false}
				/>
			</S.Content>
		</Container>
	)
}

export default Transactions
