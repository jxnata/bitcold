import Clipboard from '@react-native-clipboard/clipboard'
import React from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { smallHash } from '../../utils/small-hash'
import { toast } from '../toast'

function RowItem({ label, value, suffix, small }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'alerts' })

	const copyToClipboard = (content: string) => {
		try {
			Clipboard.setString(content)
			toast.info(t('copied_to_clipboard'))
		} catch {
			toast.error(t('no_permissions'))
		}
	}

	return (
		<S.Row onPress={() => copyToClipboard(value)}>
			<S.Label>{label}</S.Label>
			<S.Col>
				<S.Value>{small ? smallHash(value) : value}</S.Value>
				{suffix && <S.Suffix>{suffix}</S.Suffix>}
			</S.Col>
		</S.Row>
	)
}

export default RowItem

type Props = {
	label: string
	value: string
	suffix?: string
	small?: boolean
}
