import * as bitcoin from 'bitcoinjs-lib'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMMKVString } from 'react-native-mmkv'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Loading from '../../components/loading'
import RowItem from '../../components/row-item'
import { useWallet } from '../../contexts/wallet'
import { settings } from '../../database'
import KEYS from '../../database/types/keys'
import useBitcoinPrice from '../../hooks/use-bitcoin-price'
import useRates from '../../hooks/use-rates'
import { api } from '../../services/api/mempool'
import { Container } from '../../theme/global'
import { reverse } from '../../utils/reverse'
import { satsToBtc } from '../../utils/sats-to-btc'
import { smallHash } from '../../utils/small-hash'

function Broadcast({ navigation, route }: Props) {
	const { send, signed } = route.params
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>()
	const { t } = useTranslation('translation', { keyPrefix: 'broadcast' })
	const { price } = useBitcoinPrice()
	const [currency] = useMMKVString(KEYS.SETTINGS.CURRENCY, settings)
	const { fiat } = useRates(currency)
	const { wallet } = useWallet()

	const tx = useMemo(() => bitcoin.Transaction.fromBuffer(signed.txn), [signed.txn])

	const fee = useMemo(() => satsToBtc(BigInt(tx.virtualSize() * send.fee)), [send.fee, tx])
	const fiatFee = useMemo(() => fiat(Number(fee) * (price || 0)), [fee, fiat, price])
	const fiatAmount = useMemo(() => fiat(Number(satsToBtc(send.value)) * (price || 0)), [fiat, price, send.value])

	const onBroadcast = async () => {
		try {
			setError(undefined)
			setLoading(true)

			const { data } = await api.post<string>('/tx', tx.toHex())

			if (data) navigation.replace('transaction', { hash: data })
		} catch {
			setError(t('broadcast_error'))
		} finally {
			setLoading(false)
		}
	}

	const onClose = async () => {
		navigation.navigate('home')
	}

	if (!wallet) return <Loading />

	return (
		<Container>
			<Header title={t('title')} />
			<S.Content>
				<RowItem label={t('hash')} value={smallHash(reverse(tx.getHash()).toString('hex'))} />
				<RowItem label={t('to')} value={smallHash(send.to)} />
				<RowItem label={t('amount')} value={satsToBtc(send.value)} suffix={fiatAmount} />
				<RowItem label={t('fee')} value={`≈ ${fee} BTC`} suffix={fiatFee} />
				<S.Error>{error}</S.Error>
				<S.ButtonsContainer>
					<S.Button disabled={loading} onPress={onBroadcast}>
						<S.Icon name='cloud-upload-outline' />
						<S.ButtonText>{t('send')}</S.ButtonText>
					</S.Button>
					<S.IconButton onPress={onClose}>
						<S.Iconlarge name='close-circle-outline' />
					</S.IconButton>
				</S.ButtonsContainer>
			</S.Content>
		</Container>
	)
}

export default Broadcast
