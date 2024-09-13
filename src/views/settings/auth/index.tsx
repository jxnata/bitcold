import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics'

import * as S from './styles'
import { Props } from './types'
import Header from '../../../components/header'
import Loading from '../../../components/loading'
import OptionItem from '../../../components/option-item'
import { settings } from '../../../database'
import KEYS from '../../../database/types/keys'
import { Container } from '../../../theme/global'

const rnBiometrics = new ReactNativeBiometrics()

function SettingsAuth({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'settings' })
	const type = settings.getBoolean(KEYS.SETTINGS.AUTH) || false
	const [option, setOption] = useState<boolean>(type)
	const [available, setAvailable] = useState<BiometryType | 'not_available'>()

	const changeOption = (item: boolean) => {
		setOption(item)
		settings.set(KEYS.SETTINGS.AUTH, item)
		navigation.goBack()
	}

	useEffect(() => {
		try {
			const init = async () => {
				const { biometryType } = await rnBiometrics.isSensorAvailable()

				if (biometryType) {
					setAvailable(biometryType)
				} else {
					setAvailable('not_available')
				}
			}

			init()
		} catch {
			setAvailable('not_available')
		}
	}, [t])

	if (!available) return <Loading />

	return (
		<Container>
			<Header title={`${t('app_auth')} (${available !== 'not_available' ? available : 'none'})`} />
			<S.Content>
				{available === 'not_available' && <S.Error>{t('auth_not_available')}</S.Error>}
				<OptionItem
					disabled={available === 'not_available'}
					title={t('enabled')}
					selected={option}
					onPress={() => changeOption(true)}
				/>
				<OptionItem
					disabled={available === 'not_available'}
					title={t('disabled')}
					selected={!option}
					onPress={() => changeOption(false)}
				/>
			</S.Content>
		</Container>
	)
}

export default SettingsAuth
