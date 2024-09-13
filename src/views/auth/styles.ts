import Ionicon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Content = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.background};
	padding: 10px;
	gap: 30px;
`
export const Text = styled(Font)`
	font-size: 18px;
`
export const Label = styled(Font)`
	font-size: 12px;
	font-weight: 600;
`
export const Error = styled(Label)`
	color: ${props => props.theme.dangerText};
`
export const Button = styled.TouchableOpacity`
	width: 100%;
	background-color: ${props => props.theme.border};
	height: 50px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	gap: 5px;
	opacity: ${props => (props.disabled ? 0.7 : 1)};
`
export const ButtonText = styled(Font)`
	font-size: 16px;
	color: white;
	font-weight: 600;
`
export const Icon = styled(Ionicon).attrs(({ theme }) => ({
	color: theme.foreground,
	size: 64,
}))`
	opacity: 0.8;
`
