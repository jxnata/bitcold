import Ionicon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import Input from '../../components/input'
import { Font } from '../../theme/global'

export const Content = styled.View`
	flex: 1;
	background-color: ${props => props.theme.background};
	padding: 10px;
	padding-top: 20px;
`
export const XpubInput = styled(Input)`
	font-size: 16px;
	width: 100%;
	height: 100px;
`
export const Text = styled(Font)`
	font-size: 18px;
`
export const Bold = styled(Text)`
	font-weight: 800;
	margin-bottom: 20px;
`
export const Label = styled(Font)`
	font-size: 12px;
	font-weight: 600;
`
export const Error = styled(Label)`
	color: ${props => props.theme.dangerText};
`
export const InputContainer = styled.Pressable`
	margin-top: 10px;
`
export const ButtonsContainer = styled.View`
	position: absolute;
	bottom: 0px;
	left: 10px;
	padding-bottom: 10px;
	align-items: center;
	flex-direction: row;
	justify-content: space-evenly;
	width: 100%;
	gap: 5px;
`
export const NFCButton = styled.TouchableOpacity`
	height: 50px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	gap: 5px;
	margin-top: 30px;
`
export const Button = styled.TouchableOpacity`
	width: 100%;
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
