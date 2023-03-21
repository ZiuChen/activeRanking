const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3030/api'
    : 'https://vup.loveava.top/api'
const TIME_OUT = 10000

export { BASE_URL, TIME_OUT }
