import Clipboard from '@react-native-clipboard/clipboard'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, Share } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import * as S from './styles'
import { Props } from './types'
import { toast } from '../../components/toast'
import { Container } from '../../theme/global'
import { getReceiveAddress } from '../../utils/get-receive-address'

const { width } = Dimensions.get('window')

function Receive({ navigation }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'receive' })
	const address = useMemo(() => getReceiveAddress(), [])

	const onCopy = useCallback(() => {
		try {
			Clipboard.setString(address)
			toast.info(t('copied_to_clipboard'))
		} catch {
			toast.error(t('no_permissions'))
		}
	}, [address, t])

	const onShare = () => {
		Share.share({ message: address })
	}

	return (
		<Container>
			<S.Content>
				<S.QRContainer>
					<S.QRBorder>
						<QRCode size={width - 80} value={`bitcoin:${address}`} />
					</S.QRBorder>
				</S.QRContainer>
				<S.AddressContainer>
					<S.AddressText selectable>{address}</S.AddressText>
				</S.AddressContainer>
				<S.ButtonsContainer>
					<S.Button onPress={onShare}>
						<S.Icon name='share-outline' />
						<S.ButtonText>{t('share')}</S.ButtonText>
					</S.Button>
					<S.Button onPress={onCopy}>
						<S.Icon name='copy-outline' />
						<S.ButtonText>{t('copy')}</S.ButtonText>
					</S.Button>
				</S.ButtonsContainer>
			</S.Content>
		</Container>
	)
}

export default Receive
