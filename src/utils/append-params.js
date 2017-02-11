import _pickBy from 'lodash.pickby'
import _identity from 'lodash.identity'

import buildQueryString from './build-query-string'

export default (url, params) => {
  const cleanParams = _pickBy(params, _identity)
  if (Object.keys(cleanParams).length) {
    return `${url}?${buildQueryString(cleanParams)}`
  }
  return url
}
