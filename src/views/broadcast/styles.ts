import Ionicon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Content = styled.View`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const Error = styled(Font)`
	padding-top: 20px;
	font-size: 14px;
	color: ${props => props.theme.dangerText};
`
export const ButtonsContainer = styled.View`
	position: absolute;
	bottom: 0px;
	padding-bottom: 10px;
	align-items: center;
	flex-direction: row;
	justify-content: space-evenly;
	width: 100%;
	gap: 5px;
`
export const Button = styled.TouchableOpacity`
	flex: 1;
	background-color: ${props => props.theme.primary};
	height: 50px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	gap: 5px;
	opacity: ${props => (props.disabled ? 0.7 : 1)};
`
export const IconButton = styled(Button)`
	width: 50px;
	flex: none;
	background-color: ${props => props.theme.border};
`
export const ButtonText = styled(Font)`
	font-size: 16px;
	color: white;
	font-weight: 600;
`
export const Icon = styled(Ionicon).attrs(({ theme }) => ({
	color: 'white',
	size: 16,
}))``
export const Iconlarge = styled(Ionicon).attrs(({ theme }) => ({
	color: 'white',
	size: 24,
}))``
