import { MMKV } from 'react-native-mmkv'

import { STORAGE_ENCRYPT_KEY } from '../constants'

export const storage = new MMKV({
	id: 'main_storage',
	encryptionKey: STORAGE_ENCRYPT_KEY,
})

export const settings = new MMKV({
	id: 'settings_storage',
})

export const cache = new MMKV({
	id: 'cache_storage',
})
