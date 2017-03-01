import compactObject from '../src/utils/compact-object'

test('clear undefined values from an object', () => {
  const object = {
    a: 'some value',
    b: false,
    c: undefined,
    d: {},
  }

  expect(compactObject(object)).toEqual({
    a: 'some value',
    b: false,
    d: {},
  })

  expect(compactObject()).toBe(undefined)
})
