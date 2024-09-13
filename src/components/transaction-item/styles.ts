import Ionicon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Container = styled.Pressable`
	width: 100%;
	padding: 10px 0;
	border-bottom-width: 1px;
	flex-direction: row;
	border-bottom-color: ${props => props.theme.border};
	gap: 10px;
`
export const Content = styled.View``
export const Row = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	flex: 1;
`
export const Hash = styled(Font)`
	font-size: 14px;
`
export const Total = styled(Font)`
	font-size: 14px;
	font-weight: 600;
`
export const Time = styled(Font)`
	font-size: 10px;
	font-weight: 400;
`
export const TypeContainer = styled.View`
	width: 40px;
	height: 40px;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.border};
	opacity: 0.8;
`
export const Icon = styled(Ionicon).attrs(({ theme }) => ({
	color: theme.foreground,
	size: 20,
}))``
export const SendIcon = styled(Icon).attrs(({ theme }) => ({
	color: theme.dangerText,
}))``
export const ReceiveIcon = styled(Icon).attrs(({ theme }) => ({
	color: theme.successText,
}))``
export const PendingIcon = styled(Icon).attrs(({ theme }) => ({
	color: theme.warningText,
}))``
export const ConsolidationIcon = styled(Icon).attrs(({ theme }) => ({
	color: '#2b8fad',
}))``
