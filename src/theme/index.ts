const any = {
	primary: '#F7931A',
}

export const light = {
	background: '#FFFFFF',
	foreground: '#000000',
	border: '#EBF0F0',
	dangerText: '#932338',
	dangerBg: '#fad7dd',
	warningText: '#9e8c1a',
	warningBg: '#b2b26b',
	successText: '#00864e',
	successBg: '#ccf6e4',
	...any,
}

export const dark = {
	background: '#000000',
	foreground: '#FFFFFF',
	border: '#171818',
	dangerText: '#ef7f93',
	dangerBg: '#2e0b11',
	warningText: '#9e8c1a',
	warningBg: '#b2b26b',
	successText: '#5ce2aa',
	successBg: '#002a18',
	...any,
}

export default { light, dark }
