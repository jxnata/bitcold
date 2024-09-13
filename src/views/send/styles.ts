import { Dimensions } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Camera } from 'react-native-vision-camera'
import styled from 'styled-components/native'

import { Font, Input } from '../../theme/global'

const { height } = Dimensions.get('window')

export const Content = styled.View`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const ValueInput = styled(Input)`
	font-size: 28px;
	padding: 0;
	border: none;
	text-align: center;
	height: auto;
`
export const Suffix = styled(Font)`
	font-size: 12px;
	opacity: 0.8;
`
export const Fiat = styled(Font)`
	font-size: 14px;
	opacity: 0.8;
	text-align: center;
`
export const Label = styled(Font)`
	font-size: 12px;
	font-weight: 600;
`
export const Error = styled(Label)`
	color: ${props => props.theme.dangerText};
`
export const ValueContainer = styled.Pressable`
	padding-top: ${height * 0.1}px;
	align-items: baseline;
	flex-direction: row;
	width: 100%;
	justify-content: center;
	gap: 5px;
`
export const InputContainer = styled.View`
	margin-top: 20px;
`
export const QRCamera = styled(Camera)`
	flex: 1;
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
export const InputButton = styled(Button)`
	width: 50px;
	flex: none;
	background-color: 'transparent';
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
export const IconLarge = styled(Ionicon).attrs(({ theme }) => ({
	color: 'white',
	size: 24,
}))``
