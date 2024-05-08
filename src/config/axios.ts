import axiosLib from 'axios'

const axios = axiosLib.create({
  baseURL: 'http://localhost:3000/api/v1.0/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axios
