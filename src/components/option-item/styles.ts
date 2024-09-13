import Ionicon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Container = styled.Pressable`
	width: 100%;
	padding: 15px 0;
	border-width: 1px;
	flex-direction: row;
	border-bottom-color: ${props => props.theme.border};
	gap: 10px;
	opacity: ${props => (props.disabled ? 0.5 : 1)};
`
export const Row = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	flex: 1;
`
export const Text = styled(Font)`
	font-size: 16px;
`
export const Icon = styled(Ionicon).attrs(({ theme }) => ({
	color: theme.foreground,
	size: 20,
}))``
