import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Row = styled.Pressable`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 20px 0;
	border-bottom-width: 1px;
	border-bottom-color: ${props => props.theme.border};
`
export const Col = styled.View`
	align-items: flex-end;
`
export const Label = styled(Font)`
	font-size: 14px;
	font-weight: 600;
`
export const Value = styled(Font)`
	font-size: 14px;
`
export const Suffix = styled(Font)`
	font-size: 12px;
	opacity: 0.7;
`
