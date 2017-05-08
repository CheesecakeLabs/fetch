import nock from 'nock'

import farfetch from '../src'

afterAll(() => {
  nock.cleanAll()
})

const URL_TEST = 'http://api.localhost'
const API_TEST = '/login/'

const fetch = farfetch.api(URL_TEST)

function returnRequestHeaders() {
  return this.req.headers
}

test('rejects with status code != 2XX', async () => {
  nock(URL_TEST).get(API_TEST).reply(400, returnRequestHeaders)
  expect(fetch.get(API_TEST).catch(() => { throw new Error() })).toThrow()
})

test('fetches without baseURL', async () => {
  nock('http://other-api.localhost').get('/login/').reply(200, returnRequestHeaders)
  const request = await fetch.get('http://other-api.localhost/login/', { noBaseURL: true })
  expect(request.host).toBe('other-api.localhost')
})

test('gets a formatted final URL', () => {
  const url = 'http://some.thing'
  const params = {
    a: 'some value',
    b: false,
    c: undefined,
    d: ['a', 'b'],
    teste: [['a', 'b'], ['c', 'd']],
  }

  expect(fetch.getURL(url, {}, params))
    .toBe('http://some.thing/?a=some value&b=false&d[]=a&d[]=b&teste[]=a,b&teste[]=c,d')
})

test('with removeTrailingSlash = true ', () => {
  const url = 'http://some.thing/end/trailing/slash/'
  expect(fetch.getURL(url, { removeTrailingSlash: true }))
    .toBe('http://some.thing/end/trailing/slash')
})

test('with removeTrailingSlash as option instance ', () => {
  const BASE = 'http://some.thing/'
  const customFetch = farfetch.api(BASE, false, { removeTrailingSlash: true })
  const path = 'end/trailing/slash/'
  expect(customFetch.getURL(path, { removeTrailingSlash: true }))
    .toBe('http://some.thing/end/trailing/slash')
  expect(customFetch.getURL(path))
    .toBe('http://some.thing/end/trailing/slash')
})

test('has default content-type header and has no Authorization header', async () => {
  nock(URL_TEST).get(API_TEST).reply(200, returnRequestHeaders)

  const request = await fetch.get(API_TEST)

  expect(request['content-type'][0]).toBe('application/json; charset=UTF-8')
  expect(request.authorization).toBeFalsy()
})

test('has custom content-type header', async () => {
  nock(URL_TEST).get(API_TEST).reply(200, returnRequestHeaders)

  const request = await fetch.get(API_TEST, {
    headers: {
      'Content-type': 'text/html',
    },
  })
  expect(request['content-type'][0]).toBe('text/html')
})

test('has overrided Authorization headers (ignores `key`)', async () => {
  nock(URL_TEST).get(API_TEST).reply(200, returnRequestHeaders)

  const request = await fetch.get(API_TEST, {
    key: 'ABCDEFG',
    headers: {
      Authorization: 'Token ABCDEFGH',
    },
  })

  expect(request.authorization[0]).toBe('Token ABCDEFGH')
})

test('has Authorization header generated by `key` option', async () => {
  nock(URL_TEST).get(API_TEST).reply(200, returnRequestHeaders)

  const request = await fetch.get(API_TEST, { key: 'banana' })

  expect(request.authorization[0]).toBe('Token banana')
})

const defaults = { method: 'PUT', headers: { 'content-type': 'leleo', 'some-other-header': '123' } }
const fetchWithDefaults = farfetch.api(URL_TEST, defaults)

test('has default content-type header', async () => {
  nock(URL_TEST).put(API_TEST).reply(200, returnRequestHeaders)

  const request = await fetchWithDefaults.request(API_TEST)

  expect(request['content-type'][0]).toBe('leleo')
  expect(request['some-other-header'][0]).toBe('123')
})

test('has custom header generated by `key` option with custom keyword and header name', async () => {
  nock(URL_TEST).get(API_TEST).reply(200, returnRequestHeaders)
  const f = farfetch.api(URL_TEST, null, {
    defaultAuthorizationKeyword: 'SomeThing ',
    defaultAuthorizationHeader: 'NotAuth',
  })
  const request = await f.get(API_TEST, { key: 'banana' })
  expect(request.notauth[0]).toBe('SomeThing banana')
})
