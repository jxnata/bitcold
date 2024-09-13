import Ionicon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Content = styled.View`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const BlockContent = styled.View`
	width: 100%;
	gap: 5px;
	flex-direction: row;
`
export const BlockItem = styled.View`
	flex: 1;
	border-radius: 10px;
	background-color: ${props => props.theme.border};
	padding: 10px;
	align-items: center;
	justify-content: center;
	gap: 5px;
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
	background-color: ${props => props.theme.border};
	height: 50px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	gap: 5px;
	opacity: ${props => (props.disabled ? 0.7 : 1)};
`
export const DangerButton = styled(Button)`
	background-color: ${props => props.theme.dangerBg};
`
export const IconButton = styled(Button)`
	width: 50px;
`
export const ButtonText = styled(Font)`
	font-size: 16px;
	color: white;
	font-weight: 600;
`
export const DangerText = styled(ButtonText)`
	color: ${props => props.theme.dangerText};
`
export const Icon = styled(Ionicon).attrs(({ theme }) => ({
	color: 'white',
	size: 16,
}))``
export const DangerIcon = styled(Ionicon).attrs(({ theme }) => ({
	color: theme.dangerText,
	size: 16,
}))``
