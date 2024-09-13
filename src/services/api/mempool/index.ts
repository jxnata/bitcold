import axios from 'axios'

import { MEMPOOL_API_URL } from '../../../constants'

export const api = axios.create({ baseURL: MEMPOOL_API_URL })
