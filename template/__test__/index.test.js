const <%= this.camelcase(name) %> = require('../')

test('main', () => {
  expect(typeof <%= this.camelcase(name) %>).toBe('function')
})
