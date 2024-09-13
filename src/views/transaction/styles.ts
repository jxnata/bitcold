import Ionicon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Content = styled.View`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const Scroll = styled.ScrollView`
	flex: 1;
	margin-bottom: 60px;
`
export const Balance = styled(Font)`
	font-size: 24px;
`
export const Suffix = styled(Font)`
	font-size: 12px;
	opacity: 0.8;
`
export const HeadContainer = styled.View`
	padding: 30px 0;
	align-items: center;
	gap: 5px;
`
export const BalanceContainer = styled.View`
	align-items: baseline;
	flex-direction: row;
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
