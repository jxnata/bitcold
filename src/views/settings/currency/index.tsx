import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'

import * as S from './styles'
import { Props } from './types'
import Header from '../../../components/header'
import OptionItem from '../../../components/option-item'
import { settings } from '../../../database'
import KEYS from '../../../database/types/keys'
import useRates from '../../../hooks/use-rates'
import { Container } from '../../../theme/global'
import { Rate } from '../../../types/api/coincap/rate'

function SettingsCurrency({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'settings' })
	const [currency] = useMMKVString(KEYS.SETTINGS.CURRENCY, settings)
	const { rates } = useRates(currency)
	const [option, setOption] = useState<string>(currency || 'USD')

	const changeOption = (item: string) => {
		setOption(item)
		settings.set(KEYS.SETTINGS.CURRENCY, item)
		navigation.goBack()
	}

	const rateTitle = (rate: Rate) => `[${rate.symbol}] ${rate.id.replaceAll('-', ' ')}`

	return (
		<Container>
			<Header title={t('currency')} />
			<S.Content>
				<FlatList
					data={rates}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<OptionItem
							key={item.id}
							title={rateTitle(item)}
							selected={option === item.symbol}
							onPress={() => changeOption(item.symbol)}
						/>
					)}
					showsVerticalScrollIndicator={false}
				/>
			</S.Content>
		</Container>
	)
}

export default SettingsCurrency
