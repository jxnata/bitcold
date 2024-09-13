import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { Props } from './types'
import Header from '../../../components/header'
import Loading from '../../../components/loading'
import OptionItem from '../../../components/option-item'
import { useWallet } from '../../../contexts/wallet'
import { settings, storage } from '../../../database'
import KEYS from '../../../database/types/keys'
import { Container } from '../../../theme/global'
import { Network } from '../../../types/database/settings'
import { convertXpub } from '../../../utils/convert-xpub'

function SettingsNetwork({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'settings' })
	const network = (settings.getString(KEYS.SETTINGS.NETWORK) as Network) || 'mainnet'
	const [option, setOption] = useState<Network>(network)
	const { wallet, mutate } = useWallet()

	if (!wallet) return <Loading />

	const changeOption = (item: Network) => {
		setOption(item)
		const xpub = convertXpub(wallet.xpub, 'xpub', item)
		storage.set(KEYS.XPUB, xpub)
		settings.set(KEYS.SETTINGS.NETWORK, item)
		mutate()
		navigation.goBack()
	}

	return (
		<Container>
			<Header title={t('network')} />
			<S.Content>
				<OptionItem title='mainnet' selected={option === 'mainnet'} onPress={() => changeOption('mainnet')} />
				<OptionItem
					title='testnet'
					disabled
					selected={option === 'testnet'}
					onPress={() => changeOption('testnet')}
				/>
				<OptionItem
					title='regtest'
					disabled
					selected={option === 'regtest'}
					onPress={() => changeOption('regtest')}
				/>
			</S.Content>
		</Container>
	)
}

export default SettingsNetwork
