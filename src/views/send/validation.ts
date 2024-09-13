import * as yup from 'yup'

import { SendForm } from '../../types/forms/send'

const schema = yup.object().shape({
	value: yup
		.number()
		.typeError('value must be a number')
		.positive('value must be greater than zero')
		.test(
			'max_decimal_places',
			'value must have at most 8 decimal places',
			value => !value || value.toString().split('.')[1]?.length <= 8
		)
		.required('value is required'),
	to: yup
		.string()
		.matches(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/, 'invalid bitcoin address')
		.required('bitcoin address is required'),
	fee: yup.string().required('fee is required'),
})

export default schema as yup.ObjectSchema<SendForm>
