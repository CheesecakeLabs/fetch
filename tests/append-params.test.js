import appendParams from '../src/utils/append-params'

test('append params to a string', () => {
  const url = 'http://some.thing'
  const params = {
    a: 'some value',
    b: false,
    c: undefined,
  }

  expect(appendParams(url, params)).toBe('http://some.thing/?a=some value&b=false')
  expect(appendParams(url)).toBe('http://some.thing')
})
