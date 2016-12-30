import test from 'ava'
import <%= this.camelcase(name) %> from './'

test('main', t => {
  t.is(typeof <%= this.camelcase(name) %>, 'function')
})