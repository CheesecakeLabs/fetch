import nock from 'nock'

import farfetch from '../src'

afterAll(() => {
  nock.cleanAll()
})

const URL_TEST = 'http://api.localhost'
const API_TEST = '/upload/'

const fetch = farfetch.api(URL_TEST)
const form = new FormData()
form.append('a', '1')

const contentType = form.getHeaders()['content-type']
const boundary = contentType.match(/\d+/)[0]

const reply = function reply(url, body) {
  return { body, headers: this.req.headers }
}

test('upload', async () => {
  nock(URL_TEST).post(API_TEST).reply(201, reply)
  const request = await fetch.upload(API_TEST, {}, form)
  expect(request.body.includes(boundary)).toBe(true)
  expect(request.headers['content-type'][0]).toBe(contentType)
})
