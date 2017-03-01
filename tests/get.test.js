import nock from 'nock'

import farfetch from '../src'

afterAll(() => {
  nock.cleanAll()
})

const URL_TEST = 'http://api.localhost'
const API_TEST = '/login/'

const fetch = farfetch.api(URL_TEST)

test('get', async () => {
  nock(URL_TEST).get(API_TEST).reply(200, { body: 'success' })
  const request = await fetch.get(API_TEST)
  expect(request).toEqual({ body: 'success' })
})
