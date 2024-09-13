import { getPath } from './get-path'

export const getPathByIndex = (index: number, type: 'bip44' | 'bip49' | 'bip84' = 'bip84', change: boolean = false) => {
	const preffix = getPath(type)

	return `${preffix}/${change ? 1 : 0}/${index}`
}
