import styled from 'styled-components/native'

import { Font } from '../../../theme/global'

export const Content = styled.View`
	flex: 1;
	background-color: ${props => props.theme.background};
`
export const Label = styled(Font)`
	font-size: 12px;
	font-weight: 600;
`
export const Error = styled(Label)`
	color: ${props => props.theme.dangerText};
`
