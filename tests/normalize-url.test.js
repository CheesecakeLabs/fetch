import normalizeURL from '../src/utils/normalize-url'

test('normalizes a URL', () => {
  const url = ['http://some.thing', 'a', 'b', 'c']
  expect(normalizeURL(url)()).toBe('http://some.thing/a/b/c/')
  expect(normalizeURL(...url)()).toBe('http://some.thing/a/b/c/')
})
