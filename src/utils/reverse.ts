export const reverse = (src: Buffer) => {
	const buffer = new Buffer(src.length)

	for (let i = 0, j = src.length - 1; i <= j; ++i, --j) {
		buffer[i] = src[j]
		buffer[j] = src[i]
	}

	return buffer
}
