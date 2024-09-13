import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, RefreshControl } from 'react-native'

import * as S from './styles'
import Header from '../../components/header'
import Loading from '../../components/loading'
import UTXOItem from '../../components/utxo-item'
import { useWallet } from '../../contexts/wallet'
import useUTXO from '../../hooks/use-utxo'
import { Container } from '../../theme/global'

function UTXO() {
	const { t } = useTranslation('translation', { keyPrefix: 'utxo' })
	const { wallet } = useWallet()

	const addresses = useMemo(() => {
		if (!wallet) return []

		return [...wallet.addresses, ...wallet.change_addresses]
	}, [wallet])

	const { utxos, loading, mutate } = useUTXO(addresses)

	if (!wallet) return <Loading />

	return (
		<Container>
			<Header title={t('title')} />
			<S.Content>
				<FlatList
					data={utxos}
					keyExtractor={item => item.tx_hash}
					refreshControl={<RefreshControl onRefresh={mutate} refreshing={loading} />}
					renderItem={({ item }) => <UTXOItem utxo={item} />}
					showsVerticalScrollIndicator={false}
				/>
			</S.Content>
		</Container>
	)
}

export default UTXO
