import axios from 'axios'

import { BLOCKCHAIN_API_URL } from '../../../constants'

export const api = axios.create({ baseURL: BLOCKCHAIN_API_URL })
