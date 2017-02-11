import farfetch from '../src'

test('there is a new farfetch', () => {
  expect(farfetch.api('http://your_api.io/api/v1/')).toBeDefined()
})
