import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMMKVString } from 'react-native-mmkv'

import * as S from './styles'
import { Props } from './types'
import Loading from '../../components/loading'
import { useWallet } from '../../contexts/wallet'
import { settings, storage } from '../../database'
import KEYS from '../../database/types/keys'
import useBitcoinPrice from '../../hooks/use-bitcoin-price'
import useRates from '../../hooks/use-rates'
import { Container } from '../../theme/global'
import { satsToBtc } from '../../utils/sats-to-btc'

function Home({ navigation }: Props) {
	const [hide, setHide] = useState(storage.getBoolean(KEYS.SETTINGS.HIDE_BALANCE))
	const { t } = useTranslation('translation', { keyPrefix: 'home' })
	const { wallet } = useWallet()
	const { price } = useBitcoinPrice()
	const [currency] = useMMKVString(KEYS.SETTINGS.CURRENCY, settings)
	const { fiat } = useRates(currency)

	const toggleHide = useCallback(() => {
		storage.set(KEYS.SETTINGS.HIDE_BALANCE, !hide)
		setHide(old => !old)
	}, [hide])

	const navigateSend = useCallback(() => {
		navigation.navigate('send')
	}, [navigation])

	const navigateReceive = useCallback(() => {
		navigation.navigate('receive')
	}, [navigation])

	const navigateSettings = useCallback(() => {
		navigation.navigate('settings')
	}, [navigation])

	const navigateTransactions = useCallback(() => {
		navigation.navigate('transactions')
	}, [navigation])

	const fiatBalance = useMemo(() => {
		if (!wallet) return '0.00'
		if (price === 0) return '0.00'

		return fiat(price * Number(satsToBtc(BigInt(wallet.balance))))
	}, [fiat, price, wallet])

	if (!wallet) return <Loading />

	return (
		<Container>
			<S.Content>
				<S.HeadContainer>
					<S.ControlsContainer>
						<S.ControlButton onPress={toggleHide}>
							<S.LargeIcon name={hide ? 'eye-off-outline' : 'eye-outline'} />
						</S.ControlButton>
						<S.ControlButton onPress={navigateSettings}>
							<S.LargeIcon name='cog-outline' />
						</S.ControlButton>
					</S.ControlsContainer>
					<S.BalanceContainer>
						<S.Balance>{hide ? '*.********' : satsToBtc(BigInt(wallet.balance))}</S.Balance>
						<S.Suffix>BTC</S.Suffix>
					</S.BalanceContainer>
					<S.FiatBalance>{hide ? '****' : fiatBalance}</S.FiatBalance>
				</S.HeadContainer>
				<S.ButtonsContainer>
					<S.Button onPress={navigateSend}>
						<S.Icon name='arrow-up-outline' />
						<S.ButtonText>{t('send')}</S.ButtonText>
					</S.Button>
					<S.IconButton onPress={navigateTransactions}>
						<S.Icon name='reorder-four-outline' />
					</S.IconButton>
					<S.Button onPress={navigateReceive}>
						<S.Icon name='arrow-down-outline' />
						<S.ButtonText>{t('receive')}</S.ButtonText>
					</S.Button>
				</S.ButtonsContainer>
			</S.Content>
		</Container>
	)
}

export default Home
