import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	padding: 10px;
	background-color: ${props => props.theme.background};
`
export const Font = styled.Text`
	font-family: 'Source Code Pro';
	color: ${props => props.theme.foreground};
	margin-bottom: 2px;
`
export const Button = styled.TouchableOpacity`
	background-color: ${props => props.theme.primary};
	width: 100%;
	height: 50px;
	border-radius: 8px;
	align-items: center;
	justify-content: center;
`
export const Input = styled.TextInput.attrs(({ theme }) => ({ placeholderTextColor: `${theme.foreground}70` }))`
	height: 50px;
	padding: 16px;
	border-radius: 8px;
	border: solid 1.5px ${props => props.theme.border};
	background: ${props => props.theme.background};
	color: ${props => props.theme.foreground};
	font-size: 16px;
	font-family: 'Source Code Pro';
`
