import { Dimensions } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Font } from '../../theme/global'

const { width, height } = Dimensions.get('window')

export const Content = styled.View`
	flex: 1;
	align-items: center;
	justify-content: space-between;
	background-color: ${props => props.theme.background};
`
export const Balance = styled(Font)`
	font-size: 28px;
`
export const Suffix = styled(Font)`
	font-size: 12px;
	opacity: 0.8;
`
export const FiatBalance = styled(Font)`
	font-size: 14px;
	opacity: 0.7;
`
export const HeadContainer = styled.View`
	align-items: center;
	gap: 5px;
`
export const ControlsContainer = styled.View`
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	padding: 10px;
`
export const BalanceContainer = styled.Pressable`
	margin-top: ${height * 0.2}px;
	align-items: baseline;
	flex-direction: row;
	gap: 5px;
`
export const ButtonsContainer = styled.View`
	padding-bottom: 10px;
	align-items: center;
	flex-direction: row;
	justify-content: space-evenly;
	width: 100%;
	gap: 5px;
`
export const ControlButton = styled.TouchableOpacity`
	width: 50px;
	height: 50px;
	align-items: center;
	justify-content: center;
`
export const Button = styled.TouchableOpacity`
	width: ${width * 0.3}px;
	background-color: ${props => props.theme.foreground}20;
	height: 50px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	gap: 5px;
`
export const IconButton = styled(Button)`
	width: 50px;
`
export const ButtonText = styled(Font)`
	font-size: 16px;
	color: ${props => props.theme.foreground};
`
export const Icon = styled(Ionicon).attrs(({ theme }) => ({
	color: theme.foreground,
	size: 16,
}))``
export const LargeIcon = styled(Ionicon).attrs(({ theme }) => ({
	color: theme.foreground,
	size: 20,
}))``
