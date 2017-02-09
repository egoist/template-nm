module.exports = function (input, options = {}) {
  if (typeof input !== 'string') {
    throw new Error('Expected input to be string')
  }
  return Object.assign(options, {input})
}
