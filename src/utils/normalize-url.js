import normalizeURL from 'normalize-url'
import _isString from 'lodash.isstring'

const hasHTTPProtocol = url => _isString(url) && url.startsWith('http')

const appendURL = (...pieces) => pieces.reduce((acc, current) => {
  if (Array.isArray(current)) {
    return acc + appendURL.apply(this, current)
  }

  if (hasHTTPProtocol(current)) {
    return current
  }

  return `${acc}/${current}`
}, '')

// Appended slash at end to remove CORS
export default (...pieces) => normalizeURL(`${appendURL(pieces)}/`, { removeTrailingSlash: false })
