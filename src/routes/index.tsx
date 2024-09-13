import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useWallet } from '../contexts/wallet'
import { settings } from '../database'
import { populateCache } from '../database/cache/provider'
import KEYS from '../database/types/keys'
import { StackParamList } from '../types/navigation/stack'
import Auth from '../views/auth'
import Broadcast from '../views/broadcast'
import Home from '../views/home'
import Intro from '../views/intro'
import Receive from '../views/receive'
import Send from '../views/send'
import Settings from '../views/settings'
import SettingsAuth from '../views/settings/auth'
import SettingsCurrency from '../views/settings/currency'
import SettingsNetwork from '../views/settings/network'
import SettingsType from '../views/settings/type'
import Transaction from '../views/transaction'
import Transactions from '../views/transactions'
import UTXO from '../views/utxo'

const Stack = createNativeStackNavigator<StackParamList>()

const Routes = () => {
	const [auth, setAuth] = useState<boolean>(false)
	const { wallet } = useWallet()
	const { top, bottom } = useSafeAreaInsets()
	const authRequired = settings.getBoolean(KEYS.SETTINGS.AUTH)
	const contentStyle = useMemo(() => ({ marginTop: top, marginBottom: bottom }), [top, bottom])

	if (authRequired && !auth) {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName='intro' screenOptions={{ headerShown: false, contentStyle }}>
					<Stack.Screen name='auth' component={Auth} initialParams={{ setAuth }} />
				</Stack.Navigator>
			</NavigationContainer>
		)
	}

	if (!wallet) {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName='intro' screenOptions={{ headerShown: false, contentStyle }}>
					<Stack.Screen name='intro' component={Intro} />
				</Stack.Navigator>
			</NavigationContainer>
		)
	}

	return (
		<NavigationContainer onStateChange={populateCache}>
			<Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false, contentStyle }}>
				<Stack.Screen name='home' component={Home} />
				<Stack.Screen name='send' component={Send} />
				<Stack.Screen name='receive' component={Receive} />
				<Stack.Screen name='broadcast' component={Broadcast} />
				<Stack.Screen name='settings' component={Settings} />
				<Stack.Screen name='settings/network' component={SettingsNetwork} />
				<Stack.Screen name='settings/type' component={SettingsType} />
				<Stack.Screen name='settings/currency' component={SettingsCurrency} />
				<Stack.Screen name='settings/auth' component={SettingsAuth} />
				<Stack.Screen name='transactions' component={Transactions} />
				<Stack.Screen name='transaction' component={Transaction} />
				<Stack.Screen name='utxo' component={UTXO} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Routes
