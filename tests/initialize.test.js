import farfetch from '../src'

const instance = farfetch.api('http://your_api.io/api/v1/')

test('there is a new farfetch', () => {
  expect(instance).toBeDefined()
})
