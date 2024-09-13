import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Container = styled.Pressable`
	width: 100%;
	padding: 10px 0;
	border-width: 1px;
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
export const Confirmations = styled(Font)`
	font-size: 10px;
	font-weight: 400;
`
