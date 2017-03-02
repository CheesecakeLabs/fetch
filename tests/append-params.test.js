import appendParams from '../src/utils/append-params'

test('append params to a string', () => {
  const url = 'http://some.thing'
  const params = {
    a: 'some value',
    b: false,
    c: undefined,
    d: ['a', 'b'],
    teste: [['a', 'b'], ['c', 'd']],
  }

  expect(appendParams(url, params))
    .toBe('http://some.thing/?a=some value&b=false&d[]=a&d[]=b&teste[]=a,b&teste[]=c,d')
  expect(appendParams(url)).toBe('http://some.thing')
})
