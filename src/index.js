import compactObject from './utils/compact-object'
import normalizeURL from './utils/normalize-url'
import appendParams from './utils/append-params'

const PARSE_ERROR_RESPONSE = { message: 'PARSE_ERROR' }
const handleParseError = error => Promise.reject({ ...PARSE_ERROR_RESPONSE, error })

const defaultOptions = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
}

export default class Fetch {

  constructor(defaultURL, defaults) {
    this.defaultURL = defaultURL
    this.defaults = defaults || defaultOptions
  }

  static api(defaultURL, defaultHeaders) {
    return new Fetch(defaultURL, defaultHeaders)
  }

  request(url, options = {}) {
    const { headers, key, noBaseURL, params, ...opts } = options
    const authorization = key ? { Authorization: `Token ${key}` } : {}
    const finalURL = this.getURL(url, noBaseURL, params)
    const { headers: defaultHeaders, ...defaults } = this.defaults
    return fetch(finalURL, {
      ...opts,
      ...defaults,
      headers: compactObject({
        ...defaultHeaders,
        ...authorization,
        ...headers,
      }),
    })
    .then(response => Promise.all([response.json(), response.ok]))
    .catch(handleParseError)
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
