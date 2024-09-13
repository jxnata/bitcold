import React, { useEffect } from 'react'
import { StatusBar, useColorScheme, LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { ThemeProvider } from 'styled-components'
import { SWRConfig } from 'swr'

import { toastConfig } from './src/components/toast'
import { WalletProvider } from './src/contexts/wallet'
import { cacheProvider, populateCache } from './src/database/cache/provider'
import Routes from './src/routes'
import theme from './src/theme'

function App(): React.JSX.Element {
	const scheme = useColorScheme()

	useEffect(populateCache, [])

	if (!scheme) {
		return <></>
	}

	const colors = theme[scheme]

	return (
		<SafeAreaProvider>
			<StatusBar
				backgroundColor={colors.background}
				barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
			/>
			<ThemeProvider theme={theme[scheme]}>
				<WalletProvider>
					<SWRConfig value={{ provider: cacheProvider }}>
						<Routes />
					</SWRConfig>
				</WalletProvider>
			</ThemeProvider>
			<Toast position='bottom' config={toastConfig(scheme)} bottomOffset={120} />
		</SafeAreaProvider>
	)
}

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])

export default App
