import fetch from 'node-fetch'
import _pickBy from 'lodash.pickby'
import _identity from 'lodash.identity'

import normalizeURL from './utils/normalize-url'
import appendParams from './utils/append-params'

const PARSE_ERROR_RESPONSE = { message: 'PARSE_ERROR' }

export default class Farfetch {

  constructor(defaultURL) {
    this.defaultURL = defaultURL
  }

  static api(defaultURL) {
    return new Farfetch(defaultURL)
  }

  request(url, options = {}) {
    const { headers, key, noBaseURL, params, ...opts } = options
    const authorization = key ? { Authorization: `Token ${key}` } : {}
    return fetch(this.getURL(url, noBaseURL, params), {
      method: 'GET',
      ...opts,
      headers: _pickBy({
        'Content-type': 'application/json; charset=UTF-8',
        ...authorization,
        ...headers,
      }, _identity),
    })
    .then(response => Promise.all([response.json(), response.ok]))
    .catch(() => Promise.reject(PARSE_ERROR_RESPONSE))
    .then(([response, ok]) => {
      if (!ok) {
        return Promise.reject(response)
      }
      return Promise.resolve(response)
    })
  }

  getURL(url, noBaseURL = false, params = {}) {
    if (noBaseURL) {
      return appendParams(normalizeURL(url), params)
    }

    return appendParams(normalizeURL(this.defaultURL, url), params)
  }

  get(url, options) {
    return this.request(url, options)
  }

  createRequest(method, url, options, body) {
    return this.request(url, {
      ...options,
      method,
      body: JSON.stringify(body),
    })
  }

  post(url, options = {}, body) {
    return this.createRequest('POST', url, options, body)
  }

  patch(url, options = {}, body) {
    return this.createRequest('PATCH', url, options, body)
  }

  put(url, options = {}, body) {
    return this.createRequest('PUT', url, options, body)
  }

  delete(url, options = {}, body) {
    return this.createRequest('DELETE', url, options, body)
  }

  upload(url, options = {}, formData) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        'Content-type': undefined,
      },
    })
  }

}
