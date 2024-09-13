import React from 'react'
import { useTranslation } from 'react-i18next'

import * as S from './styles'
import { UTXO } from '../../types/api/blockchain/utxo'
import { satsToBtc } from '../../utils/sats-to-btc'

type Props = {
	utxo: UTXO
}

function UTXOItem({ utxo }: Props) {
	const { t } = useTranslation('translation', { keyPrefix: 'utxo' })

	return (
		<S.Container>
			<S.Row>
				<S.Content>
					<S.Hash>
						{utxo.tx_hash_big_endian.slice(0, 6)}...{utxo.tx_hash_big_endian.slice(-6)}
					</S.Hash>
					<S.Confirmations>
						{utxo.confirmations} {t('confirmations')}
					</S.Confirmations>
				</S.Content>
				<S.Total>{satsToBtc(BigInt(utxo.value))} BTC</S.Total>
			</S.Row>
		</S.Container>
	)
}

export default UTXOItem
