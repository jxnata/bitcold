import NfcManager, { NfcTech } from 'react-native-nfc-manager'

import { parseNfcData } from './parse-nfc-data'
import { SignedTransaction } from '../types/models/signed_transaction'

export const readNfcTransaction = async () => {
	try {
		await NfcManager.requestTechnology(NfcTech.Ndef)

		const tag = await NfcManager.ndefHandler.getNdefMessage()

		if (!tag) return

		const data: SignedTransaction = {
			head: '',
			txid: Buffer.from(''),
			sha256: Buffer.from(''),
			txn: Buffer.from(''),
		}

		for (const record of tag.ndefMessage) {
			let type
			if (typeof record.type !== 'string') {
				type = String.fromCharCode.apply(null, record.type)
			} else {
				type = record.type
			}

			if (type === 'T') {
				data.head = parseNfcData(record.payload)
			}

			if (type === 'bitcoin.org:txid') {
				data.txid = Buffer.from(record.payload)
			}

			if (type === 'bitcoin.org:sha256') {
				data.sha256 = Buffer.from(record.payload)
			}

			if (type === 'bitcoin.org:txn') {
				data.txn = Buffer.from(record.payload)
			}
		}

		return data
	} catch {
		throw new Error('Failed to read from NFC')
	} finally {
		NfcManager.cancelTechnologyRequest()
	}
}
