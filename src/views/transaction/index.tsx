import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Linking, RefreshControl } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'

import * as S from './styles'
import { Props } from './types'
import Loading from '../../components/loading'
import RowItem from '../../components/row-item'
import { settings } from '../../database'
import KEYS from '../../database/types/keys'
import useBitcoinPrice from '../../hooks/use-bitcoin-price'
import useRates from '../../hooks/use-rates'
import useTransaction from '../../hooks/use-transaction'
import { Container } from '../../theme/global'
import { getTransactionValues } from '../../utils/get-tx-values'
import { isMyAddress } from '../../utils/is-my-address'
import { satsToBtc } from '../../utils/sats-to-btc'

function Transaction({ route }: Props) {
	const { hash, initialData } = route.params
	const { t } = useTranslation('translation', { keyPrefix: 'transaction' })
	const { transaction, loading, mutate } = useTransaction(hash, initialData)
	const { price } = useBitcoinPrice()
	const [currency] = useMMKVString(KEYS.SETTINGS.CURRENCY, settings)
	const { fiat } = useRates(currency)
	const details = useMemo(() => transaction && getTransactionValues(transaction), [transaction])

	const fiatFee = useMemo(() => {
		if (!transaction || !price) return fiat(0)
		return fiat(Number(satsToBtc(BigInt(transaction.fee))) * price)
	}, [price, transaction, fiat])

	const fiatAmount = useMemo(() => {
		if (!details || !price) return fiat(0)
		return fiat(Number(satsToBtc(BigInt(details.amount))) * price)
	}, [price, details, fiat])

	const onViewDetails = useCallback(() => {
		if (!transaction) return
		Linking.openURL(`https://mempool.space/tx/${transaction.hash}`)
	}, [transaction])

	if (!transaction || !details) return <Loading />

	return (
		<Container>
			<S.Content>
				<S.Scroll
					showsVerticalScrollIndicator={false}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={mutate} />}
				>
					<S.HeadContainer>
						<S.Suffix>{t(`type_${details.type}`)}</S.Suffix>
						<S.BalanceContainer>
							<S.Balance>{satsToBtc(BigInt(details.amount))}</S.Balance>
							<S.Suffix>BTC</S.Suffix>
						</S.BalanceContainer>
					</S.HeadContainer>
					<RowItem label={t('hash')} value={transaction.hash} small />
					{details.inputs.length > 1 ? (
						<>
							{details.inputs.map((input, index) => (
								<RowItem label={`${t('input')} ${index}`} value={input.address} key={index} small />
							))}
						</>
					) : (
						<RowItem label={t('from')} value={details.inputs[0].address} small />
					)}
					{details.outputs.length > 1 ? (
						<>
							{details.outputs.map((output, index) => (
								<RowItem
									label={`${t('output')} ${index}`}
									value={output.address}
									suffix={isMyAddress(output.address).result ? t('your_address') : undefined}
									key={index}
									small
								/>
							))}
						</>
					) : (
						<RowItem label={t('to')} value={details.outputs[0].address} small />
					)}
					<RowItem
						label={t('amount')}
						value={`${satsToBtc(BigInt(details.amount))} BTC`}
						suffix={fiatAmount}
					/>
					<RowItem label={t('fee')} value={`≈ ${satsToBtc(BigInt(transaction.fee))} BTC`} suffix={fiatFee} />
					<RowItem
						label={t('block')}
						value={transaction.block_index ? transaction.block_index.toString() : t('pending')}
					/>
					<RowItem label={t('date')} value={new Date(transaction.time * 1000).toLocaleString()} />
				</S.Scroll>
				<S.ButtonsContainer>
					<S.Button onPress={onViewDetails}>
						<S.Icon name='link-outline' />
						<S.ButtonText>{t('view_details')}</S.ButtonText>
					</S.Button>
				</S.ButtonsContainer>
			</S.Content>
		</Container>
	)
}

export default Transaction
