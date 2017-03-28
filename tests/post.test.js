import nock from 'nock'

import farfetch from '../src'

afterAll(() => {
  nock.cleanAll()
})

const URL_TEST = 'http://api.localhost'
const API_TEST = '/login/'
const CONTENT_TYPE = { 'content-type': 'application/json; charset=whatever' }

const fetch = farfetch.api(URL_TEST)

test('post', async () => {
  nock(URL_TEST).post(API_TEST).reply(201, { mybody: 'sexy' }, CONTENT_TYPE)

  const request = await fetch.post(API_TEST, {}, { mybody: 'sexy' })
  expect(request).toEqual({ mybody: 'sexy' })
})
