import _pickBy from 'lodash.pickby'
import _identity from 'lodash.identity'

import buildQueryString from './build-query-string'

const appendParams = (url, cleanParams) => {
  if (Object.keys(cleanParams).length) {
    return `${url}?${buildQueryString(cleanParams)}`
  }
  return url
}

export default (url, params) => appendParams(url, _pickBy(params, _identity))
