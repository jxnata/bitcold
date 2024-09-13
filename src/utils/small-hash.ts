export const smallHash = (hash: string, size = 8) => {
	if (hash.length <= size * 2) {
		return hash
	}
	return hash.slice(0, size) + '...' + hash.slice(-size)
}
