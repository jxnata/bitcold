import React from 'react'

import * as S from './styles'

type Props = {
	title: string
	selected: boolean
	disabled?: boolean
	onPress: () => void
}

function OptionItem({ title, disabled, selected, onPress }: Props) {
	return (
		<S.Container disabled={disabled} onPress={disabled ? () => {} : onPress}>
			<S.Row>
				<S.Text numberOfLines={1}>{title}</S.Text>
				<S.Icon name={selected ? 'checkmark-circle' : 'ellipse-outline'} />
			</S.Row>
		</S.Container>
	)
}

export default OptionItem
