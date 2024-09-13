import React, { useState } from 'react'
import { TextInputProps } from 'react-native'

import * as S from './styles'

const Input = (props: TextInputProps & { label?: string; Right?: JSX.Element }) => {
	const Right = props.Right
	const [isFocused, setIsFocused] = useState(false)

	return (
		<S.Container>
			{!!props.label && (
				<S.LabelContainer>
					<S.Label>{props.label}</S.Label>
				</S.LabelContainer>
			)}
			<S.Input
				{...props}
				aria-selected={isFocused}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			{!!props.Right && <S.RightContainer>{Right}</S.RightContainer>}
		</S.Container>
	)
}

export default Input
