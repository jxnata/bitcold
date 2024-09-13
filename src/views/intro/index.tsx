import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Keyboard, NativeSyntheticEvent, TextInputKeyPressEventData, TouchableWithoutFeedback } from 'react-native'
import NfcManager, { NfcEvents, TagEvent } from 'react-native-nfc-manager'

import * as S from './styles'
import schema from './validation'
import useCheckbox from '../../components/checkbox'
import { useWallet } from '../../contexts/wallet'
import { storage } from '../../database'
import KEYS from '../../database/types/keys'
import { Container } from '../../theme/global'
import { ImportForm } from '../../types/forms/import'
import { convertXpub } from '../../utils/convert-xpub'
import { getImportedWalletFromJSON } from '../../utils/get-imported-wallet-from-json'
import { getPath } from '../../utils/get-path'
import { parseNfcData } from '../../utils/parse-nfc-data'

function Intro() {
	const [hasNfc, setHasNFC] = useState(false)
	const { t } = useTranslation('translation', { keyPrefix: 'intro' })
	const { CheckboxComponent } = useCheckbox(['bip44', 'bip49', 'bip84'], ['bip84'], true)
	const { control, formState, handleSubmit, setValue } = useForm<ImportForm>({
		defaultValues: { data: '', type: 'bip84' },
		resolver: yupResolver(schema),
	})
	const { mutate } = useWallet()

	const onImport = (form: ImportForm) => {
		if (form.data.startsWith('{')) {
			const main = getImportedWalletFromJSON(form.data, form.type)
			storage.set(KEYS.PATH, main[form.type].deriv)
			storage.set(KEYS.MASTER_XPUB, main.xpub)
			storage.set(KEYS.XPUB, main[form.type].xpub)
		} else {
			const xpub = convertXpub(form.data, 'xpub')
			storage.set(KEYS.PATH, getPath(form.type))
			storage.set(KEYS.MASTER_XPUB, xpub)
			storage.set(KEYS.XPUB, xpub)
		}

		mutate(form.type)
	}

	const readTag = async () => {
		await NfcManager.registerTagEvent()
	}

	const onKeyPress = async (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
		if (e.nativeEvent.key === 'Enter') {
			e.preventDefault()
			Keyboard.dismiss()
		}
	}

	useEffect(() => {
		const checkIsSupported = async () => {
			const deviceIsSupported = await NfcManager.isSupported()
			setHasNFC(deviceIsSupported)
		}

		checkIsSupported()
	}, [])

	useEffect(() => {
		NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: TagEvent) => {
			const data = parseNfcData(tag.ndefMessage[0].payload)

			setValue('data', data)
			Keyboard.dismiss()
			NfcManager.unregisterTagEvent()
		})

		return () => {
			NfcManager.setEventListener(NfcEvents.DiscoverTag, null)
		}
	}, [setValue])

	return (
		<Container>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<S.Content>
					<S.Bold>{t('title')}</S.Bold>
					<S.Text>{t('welcome')}</S.Text>
					<S.InputContainer>
						<Controller
							control={control}
							rules={{ required: true }}
							name='data'
							render={({ field: { onChange, onBlur, value } }) => (
								<S.XpubInput
									placeholder={t('data_placeholder')}
									keyboardType='default'
									autoComplete='off'
									autoCorrect={false}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value.trim().toString()}
									numberOfLines={4}
									multiline
									onKeyPress={onKeyPress}
								/>
							)}
						/>
						<S.Error>{formState.errors.data?.message}</S.Error>
					</S.InputContainer>
					<S.InputContainer>
						<Controller
							control={control}
							rules={{ required: true }}
							name='type'
							render={({ field: { onChange, onBlur, value } }) => (
								<CheckboxComponent onChange={onChange} />
							)}
						/>
						<S.Error>{formState.errors.type?.message}</S.Error>
					</S.InputContainer>
					{hasNfc && (
						<S.NFCButton onPress={readTag}>
							<S.Icon name='radio-outline' />
							<S.ButtonText>{t('read_nfc')}</S.ButtonText>
						</S.NFCButton>
					)}
					<S.ButtonsContainer>
						<S.Button onPress={handleSubmit(onImport)}>
							<S.Icon name='arrow-forward-outline' />
							<S.ButtonText>{t('import')}</S.ButtonText>
						</S.Button>
					</S.ButtonsContainer>
				</S.Content>
			</TouchableWithoutFeedback>
		</Container>
	)
}

export default Intro
