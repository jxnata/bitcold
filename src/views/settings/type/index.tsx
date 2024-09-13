import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { Props } from './types'
import Header from '../../../components/header'
import OptionItem from '../../../components/option-item'
import { useWallet } from '../../../contexts/wallet'
import { settings } from '../../../database'
import KEYS from '../../../database/types/keys'
import { Container } from '../../../theme/global'
import { AddressType } from '../../../types/database/settings'

function SettingsType({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'settings' })
	const type = (settings.getString(KEYS.SETTINGS.TYPE) as AddressType) || 'bip84'
	const [option, setOption] = useState<AddressType>(type)
	const { mutate } = useWallet()

	const changeOption = (item: AddressType) => {
		setOption(item)
		settings.set(KEYS.SETTINGS.TYPE, item)
		mutate(item)
		navigation.goBack()
	}

	return (
		<Container>
			<Header title={t('address_type')} />
			<S.Content>
				<OptionItem title='P2PKH (bip44)' selected={option === 'bip44'} onPress={() => changeOption('bip44')} />
				<OptionItem
					title='P2SH-P2WPKH (bip49)'
					selected={option === 'bip49'}
					onPress={() => changeOption('bip49')}
				/>
				<OptionItem
					title='P2WPKH (bip84)'
					selected={option === 'bip84'}
					onPress={() => changeOption('bip84')}
				/>
			</S.Content>
		</Container>
	)
}

export default SettingsType
