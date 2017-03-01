import nock from 'nock'

import farfetch from '../src'

afterAll(() => {
  nock.cleanAll()
})

const URL_TEST = 'http://api.localhost'
const API_TEST = '/login/'

const fetch = farfetch.api(URL_TEST)

const reply = function reply(url, body) {
  return { body: JSON.parse(body), headers: this.req.headers }
}

test('put', async () => {
  nock(URL_TEST).put(API_TEST).reply(200, reply)

  const request = await fetch.put(API_TEST, {}, { mybody: 'sexy' })
  expect(request.body).toEqual({ mybody: 'sexy' })
})
