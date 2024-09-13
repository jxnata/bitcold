import React from 'react'

import * as S from './styles'

type Props = {
	title: string
	danger?: boolean
	onPress: () => void
}

function SettingsItem({ title, danger, onPress }: Props) {
	return (
		<S.Container onPress={onPress}>
			{danger ? (
				<S.Row>
					<S.DangerText>{title}</S.DangerText>
					<S.DangerIcon name='chevron-forward' />
				</S.Row>
			) : (
				<S.Row>
					<S.Text>{title}</S.Text>
					<S.Icon name='chevron-forward' />
				</S.Row>
			)}
		</S.Container>
	)
}

export default SettingsItem
