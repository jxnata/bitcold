import { Dimensions } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Font } from '../../theme/global'

const { height } = Dimensions.get('window')

export const Content = styled.View`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const QRContainer = styled.View`
	padding-top: ${height * 0.1}px;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-bottom: 30px;
`
export const QRBorder = styled.View`
	padding: 10px;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.foreground};
`
export const AddressContainer = styled.View`
	margin-left: 20px;
	margin-right: 20px;
	padding: 10px;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.border};
`
export const AddressText = styled(Font)`
	font-size: 18px;
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
