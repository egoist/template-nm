const sao = require('sao')

const template = {
  fromPath: process.cwd()
}

it('add unit test', () => {
  return sao.mockPrompt(template, {
    unitTest: true,
    coverage: false,
    eslint: 'disable',
    compile: false
  }).then(files => {
    expect(files['test/index.test.js']).toBeDefined()

    const pkg = JSON.parse(files['package.json'].contents.toString())
    expect(pkg.scripts.test).toBe('jest')
    expect(pkg.devDependencies['jest-cli']).toBeDefined()
  })
})

it('add coverage', () => {
  return sao.mockPrompt(template, {
    unitTest: true,
    coverage: true,
    eslint: 'disable',
    compile: false
  }).then(files => {
    expect(files['circle.yml'].contents.toString()).toMatch('bash <(curl -s https://codecov.io/bash)')
    expect(files['circle.yml'].contents.toString()).toMatch('yarn test:cov')

    const pkg = JSON.parse(files['package.json'].contents.toString())
    expect(pkg.scripts['test:cov']).toBe('jest --coverage')
  })
})