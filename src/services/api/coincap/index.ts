import axios from 'axios'

import { PRICES_API_URL } from '../../../constants'

export const api = axios.create({ baseURL: PRICES_API_URL })
