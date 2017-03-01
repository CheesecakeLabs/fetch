import normalizeURL from 'normalize-url'

const isString = string => typeof string === 'string'
const hasHTTPProtocol = url => isString(url) && url.startsWith('http')

const appendURL = (...pieces) => pieces.reduce((acc, current) => {
  if (Array.isArray(current)) {
    return acc + appendURL.apply(this, current)
  }

  if (hasHTTPProtocol(current)) {
    return current
  }

  return `${acc}/${current}`
}, '')

export default (...pieces) => normalizeURL(`${appendURL(pieces)}/`, { removeTrailingSlash: false })
