import styled from 'styled-components/native'

import { Font } from '../../theme/global'

export const Content = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
	margin-bottom: 10px;
`
export const Text = styled(Font)`
	font-size: 20px;
	font-weight: 700;
`
