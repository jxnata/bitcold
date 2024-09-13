import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactNativeBiometrics from 'react-native-biometrics'

import * as S from './styles'
import { Props } from './types'
import { Container } from '../../theme/global'

const rnBiometrics = new ReactNativeBiometrics()

function Auth({ route }: Props) {
	const { setAuth } = route.params
	const [failed, setFailed] = useState<string>()
	const { t } = useTranslation('translation', { keyPrefix: 'auth' })

	const showAuth = useCallback(() => {
		rnBiometrics
			.simplePrompt({ promptMessage: t('auth_prompt') })
			.then(result => {
				const { success } = result

				if (success) {
					setAuth(true)
				} else {
					setFailed('auth_failed')
				}
			})
			.catch(() => setFailed('auth_error'))
	}, [setAuth, t])

	useEffect(() => {
		try {
			const init = async () => {
				const { available } = await rnBiometrics.isSensorAvailable()
				if (!available) setFailed('auth_not_available')
			}

			init()
			showAuth()
		} catch {
			setFailed('auth_not_available')
		}
	}, [showAuth, t])

	return (
		<Container>
			<S.Content>
				<S.Text>{t('auth_message')}</S.Text>
				<S.Icon name='finger-print-outline' />
				{!!failed && (
					<>
						<S.Error>{t(failed)}</S.Error>
						<S.Button>
							<S.ButtonText onPress={showAuth}>{t('try_again')}</S.ButtonText>
						</S.Button>
					</>
				)}
			</S.Content>
		</Container>
	)
}

export default Auth
