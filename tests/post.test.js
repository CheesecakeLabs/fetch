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

test('post', async () => {
  nock(URL_TEST).post(API_TEST).reply(201, reply)

  const request = await fetch.post(API_TEST, {}, { mybody: 'sexy' })
  expect(request.body).toEqual({ mybody: 'sexy' })
})
