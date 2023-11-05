import axios from 'axios'

const tesloApi = axios.create({
  baseURL: '/api',
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
})

export default tesloApi
