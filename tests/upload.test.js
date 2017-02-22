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

test('has default multipart body', async () => {
  nock(URL_TEST).post(API_TEST).reply(201, (uri, requestBody) => requestBody)

  const request = await fetch.upload(API_TEST, form)
  expect(request).toBe('a=1')
})
