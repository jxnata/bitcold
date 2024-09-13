import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Alert, Share } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import { useCameraDevice, useCodeScanner } from 'react-native-vision-camera'

import * as S from './styles'
import { Props } from './types'
import schema from './validation'
import useCheckbox from '../../components/checkbox'
import Input from '../../components/input'
import Loading from '../../components/loading'
import { toast } from '../../components/toast'
import { useWallet } from '../../contexts/wallet'
import { settings } from '../../database'
import KEYS from '../../database/types/keys'
import useBitcoinPrice from '../../hooks/use-bitcoin-price'
import useFees from '../../hooks/use-fees'
import useRates from '../../hooks/use-rates'
import useUTXO from '../../hooks/use-utxo'
import { Container } from '../../theme/global'
import { Fee } from '../../types/api/mempool/fee'
import { SendForm } from '../../types/forms/send'
import { btcInputValue } from '../../utils/btc-input-value'
import { btcToSats } from '../../utils/btc-to-sats'
import { btcUrlDecode } from '../../utils/btc-url-decode'
import { SendTransaction, createTransaction } from '../../utils/create-transaction'
import { readNfcTransaction } from '../../utils/read-nfc-transaction'
import { writeNfcTransaction } from '../../utils/write-nfc-transaction'

function Send({ navigation }: Props) {
	const [error, setError] = useState<string>()
	const [displayCammera, setDisplayCammera] = useState<boolean>(false)
	const { t } = useTranslation('translation', { keyPrefix: 'send' })
	const { fees } = useFees()
	const { price } = useBitcoinPrice()
	const [currency] = useMMKVString(KEYS.SETTINGS.CURRENCY, settings)
	const { fiat } = useRates(currency)
	const { wallet } = useWallet()
	const addresses = useMemo(() => (wallet ? [...wallet.addresses, ...wallet.change_addresses] : []), [wallet])
	const { utxos } = useUTXO(addresses)
	const device = useCameraDevice('back')

	const { control, formState, handleSubmit, watch, setValue } = useForm<SendForm>({
		defaultValues: { value: 0, to: '', fee: 'fastestFee' },
		resolver: yupResolver(schema),
	})

	const { CheckboxComponent, selectedValues } = useCheckbox(
		['fastestFee', 'halfHourFee', 'hourFee', 'economyFee'],
		['fastestFee'],
		true
	)

	const amount = watch('value', 0)

	const fiatPrice = useMemo(() => fiat(amount * (price || 0)), [amount, fiat, price])

	const selectedFee = useMemo(() => {
		if (!fees) return ''
		if (!selectedValues.length) return ''
		const selected = selectedValues[0] as keyof Fee

		return `${fees[selected]} sat/vB`
	}, [fees, selectedValues])

	const createPSBT = useCallback(
		async (data: SendForm) => {
			if (!fees) return

			setError(undefined)

			const tx_body: SendTransaction = {
				fee: fees[data.fee],
				to: data.to,
				value: btcToSats(data.value),
			}

			const tx = createTransaction(tx_body, utxos)

			return tx
		},
		[fees, utxos]
	)

	const onSend = async (data: SendForm) => {
		try {
			const tx = await createPSBT(data)

			if (!tx) return

			const written = await writeNfcTransaction(tx.toBase64())

			if (!written) return setError(t('nfc_write_error'))

			onWrittenAlert(data)
		} catch {
			setError(t('nfc_write_error'))
		}
	}

	const onShare = async (data: SendForm) => {
		const tx = await createPSBT(data)
		if (!tx) return

		Share.share({ message: tx.toBase64() })
	}

	const onWritten = async (data: SendForm) => {
		try {
			if (!fees) return

			const send: SendTransaction = {
				fee: fees[data.fee],
				to: data.to,
				value: btcToSats(data.value),
			}

			const signed = await readNfcTransaction()
			if (signed) navigation.navigate('broadcast', { send, signed })
		} catch {
			setError(t('nfc_read_error'))
		}
	}

	const onWrittenAlert = (data: SendForm) => {
		Alert.alert(t('read_nfc'), t('read_nfc_desc'), [
			{ text: t('cancel'), style: 'cancel' },
			{ text: t('read'), onPress: () => onWritten(data) },
		])
	}

	const codeScanner = useCodeScanner({
		codeTypes: ['qr'],
		onCodeScanned: codes => {
			try {
				if (!codes[0]) return
				if (!codes[0].value) return

				const { address, amount } = btcUrlDecode(codes[0].value)
				setValue('to', address)
				setValue('value', Number(amount))
				setDisplayCammera(false)
			} catch {
				toast.error(t('invalid_btc_qr_code'))
			}
		},
	})

	const handleQR = () => {
		setDisplayCammera(true)
	}
	const closeCamera = () => {
		setDisplayCammera(false)
	}

	if (!wallet) return <Loading />

	return (
		<Container>
			{displayCammera && device ? (
				<S.Content>
					<S.QRCamera isActive={displayCammera} device={device} codeScanner={codeScanner} />
					<S.ButtonsContainer>
						<S.IconButton onPress={closeCamera}>
							<S.IconLarge name='close-outline' />
						</S.IconButton>
					</S.ButtonsContainer>
				</S.Content>
			) : (
				<S.Content>
					<S.ValueContainer>
						<Controller
							control={control}
							rules={{ required: true }}
							name='value'
							render={({ field: { onChange, onBlur, value } }) => (
								<S.ValueInput
									autoFocus
									inputMode='decimal'
									returnKeyType='done'
									onBlur={onBlur}
									onChange={e => btcInputValue(e.nativeEvent.text, onChange)}
									value={value.toString()}
								/>
							)}
						/>
						<S.Suffix>BTC</S.Suffix>
					</S.ValueContainer>
					<S.Fiat>≈ {fiatPrice}</S.Fiat>
					<S.Error>{formState.errors.value?.message}</S.Error>
					<S.InputContainer>
						<Controller
							control={control}
							rules={{ required: true }}
							name='to'
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									label={t('to')}
									placeholder={t('receiver_address')}
									keyboardType='default'
									autoComplete='off'
									autoCorrect={false}
									returnKeyType='done'
									autoCapitalize='none'
									onBlur={onBlur}
									onChangeText={onChange}
									value={value.toString()}
									Right={
										<S.InputButton onPress={handleQR}>
											<S.Icon name='qr-code-outline' />
										</S.InputButton>
									}
								/>
							)}
						/>
						<S.Error>{formState.errors.to?.message}</S.Error>
					</S.InputContainer>
					{!!fees && (
						<S.InputContainer>
							<Input label={t('fee')} autoCorrect={false} value={selectedFee} readOnly />
							<Controller
								control={control}
								rules={{ required: true }}
								name='fee'
								render={({ field: { onChange, onBlur, value } }) => (
									<CheckboxComponent onChange={onChange} />
								)}
							/>
							<S.Error>{formState.errors.fee?.message}</S.Error>
						</S.InputContainer>
					)}
					{error && <S.Error>{error}</S.Error>}
					<S.ButtonsContainer>
						<S.Button onPress={handleSubmit(onSend)}>
							<S.Icon name='finger-print-outline' />
							<S.ButtonText>{t('sign')}</S.ButtonText>
						</S.Button>
						<S.IconButton onPress={handleSubmit(onShare)}>
							<S.Icon name='share-outline' />
						</S.IconButton>
					</S.ButtonsContainer>
				</S.Content>
			)}
		</Container>
	)
}

export default Send
