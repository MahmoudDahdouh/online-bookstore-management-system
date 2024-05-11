const setUrl = (url, query, key, value) => {
  query[key] = value
  return `${url}?${Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&')}`
}

const query = { sort: 'price', order: 'asc' }

const setUrlNew = (key, value) => {
  query[key] = value
  return `/books?${Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&')}`
}

console.log(setUrlNew('sort', 'price'))
// output: /books?sort=price&order=asc

console.log(setUrlNew('order', 'desc'))
// output: /books?sort=price&order=desc

console.log(setUrlNew('order', 'asc'))
// output: /books?sort=price&order=asc
