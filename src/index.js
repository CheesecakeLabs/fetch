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

  constructor(defaultURL, defaults, options = {}) {
    this.defaultURL = defaultURL
    this.defaults = defaults || defaultOptions
    this.options = options
  }

  static api(defaultURL, defaultHeaders) {
    return new Fetch(defaultURL, defaultHeaders)
  }

  request(url, options = {}) {
    const { headers, key, noBaseURL, removeTrailingSlash, params, ...opts } = options
    const authorization = key ? { Authorization: `Token ${key}` } : {}
    const finalURL = this.getURL(
      url,
      {
        noBaseURL,
        removeTrailingSlash: removeTrailingSlash || this.options.removeTrailingSlash,
      },
      params,
    )
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

  getURL(url, options = this.options, params = {}) {
    if (options.noBaseURL) {
      return appendParams(normalizeURL(url)(options), params, options)
    }

    return appendParams(normalizeURL(this.defaultURL, url)(options), params, options)
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
      method: 'POST',
      ...options,
      body: formData,
      headers: {
        'Content-type': undefined,
      },
    })
  }

}
