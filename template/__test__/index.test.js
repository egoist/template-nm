import test from 'ava'
import <%= this.camelcase(name) %> from '../'

test('main', () => {
  expect(typeof <%= this.camelcase(name) %>).toBe('function')
})
