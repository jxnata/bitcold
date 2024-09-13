import React from 'react'

import * as S from './styles'

type Props = {
	title: string
}

function Header({ title }: Props) {
	return (
		<S.Content>
			<S.Text>{title}</S.Text>
		</S.Content>
	)
}

export default Header
