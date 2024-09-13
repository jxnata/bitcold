import * as yup from 'yup'

import { ImportForm } from '../../types/forms/import'

const schema = yup.object().shape({
	data: yup.string().required('data is required'),
	type: yup.string().required().oneOf(['bip44', 'bip49', 'bip84']),
})

export default schema as yup.ObjectSchema<ImportForm>
