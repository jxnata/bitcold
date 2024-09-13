import React from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { useMMKVBoolean, useMMKVString } from 'react-native-mmkv'

import * as S from './styles'
import { Props } from './types'
import Header from '../../components/header'
import Loading from '../../components/loading'
import SettingsItem from '../../components/settings-item'
import { useWallet } from '../../contexts/wallet'
import { settings, storage } from '../../database'
import KEYS from '../../database/types/keys'
import { Container } from '../../theme/global'
import { getFingerprint } from '../../utils/get-fingerprint'

function Settings({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'settings' })
	const { wallet, remove } = useWallet()
	const [network] = useMMKVString(KEYS.SETTINGS.NETWORK, settings)
	const [type] = useMMKVString(KEYS.SETTINGS.TYPE, settings)
	const [currency] = useMMKVString(KEYS.SETTINGS.CURRENCY, settings)
	const [auth] = useMMKVBoolean(KEYS.SETTINGS.AUTH, settings)
	const type_name = type === 'bip44' ? 'P2PKH' : type === 'bip49' ? 'P2SH-P2WPKH' : 'P2WPKH'
	const master_xpub = storage.getString(KEYS.MASTER_XPUB)!
	const path = storage.getString(KEYS.PATH)!
	const fingerprint = getFingerprint(master_xpub)

	if (!wallet) return <Loading />

	const onDelete = () => {
		Alert.alert(t('delete_wallet_title'), t('delete_wallet_desc'), [
			{
				text: t('cancel'),
				style: 'cancel',
			},
			{
				text: t('delete_ok'),
				onPress: remove,
				style: 'destructive',
			},
		])
	}

	const navigateToUTXO = () => navigation.navigate('utxo')
	const navigateToNetwork = () => navigation.navigate('settings/network')
	const navigateToType = () => navigation.navigate('settings/type')
	const navigateToCurrency = () => navigation.navigate('settings/currency')
	const navigateToAuth = () => navigation.navigate('settings/auth')

	return (
		<Container>
			<Header title={t('title')} />
			<S.Content>
				<S.BlockContent>
					<S.BlockItem>
						<S.Icon name='finger-print-outline' />
						<S.ButtonText>{fingerprint}</S.ButtonText>
					</S.BlockItem>
					<S.BlockItem>
						<S.Icon name='footsteps' />
						<S.ButtonText>{path}</S.ButtonText>
					</S.BlockItem>
				</S.BlockContent>
				<SettingsItem title={t('utxo_list')} onPress={navigateToUTXO} />
				<SettingsItem title={`${t('network')}: ${network || 'mainnet'}`} onPress={navigateToNetwork} />
				<SettingsItem title={`${t('address_type')}: ${type_name || 'P2WPKH'}`} onPress={navigateToType} />
				<SettingsItem title={`${t('currency')}: ${currency || 'USD'}`} onPress={navigateToCurrency} />
				<SettingsItem title={`${t('auth')}: ${auth ? t('enabled') : t('disabled')}`} onPress={navigateToAuth} />
				<SettingsItem title={t('delete')} danger onPress={onDelete} />
			</S.Content>
		</Container>
	)
}

export default Settings
