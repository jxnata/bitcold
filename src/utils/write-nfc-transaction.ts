import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager'

export const writeNfcTransaction = async (data: string) => {
	let result = false

	try {
		await NfcManager.requestTechnology(NfcTech.Ndef)

		const payload = Ndef.encodeMessage([
			Ndef.textRecord('unsigned psbt begin'),
			Ndef.record(Ndef.TNF_EXTERNAL_TYPE, 'bitcoin.org:psbt', Date.now().toString(), data),
			Ndef.textRecord('unsigned psbt end'),
		])

		await NfcManager.ndefHandler.writeNdefMessage(payload)

		result = true
	} catch {
		throw new Error('Failed to write to NFC')
	} finally {
		NfcManager.cancelTechnologyRequest()
	}

	return result
}
