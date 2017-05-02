const sao = require('sao')

const template = {
  fromPath: process.cwd()
}

it('add unit test', () => {
  return sao.mockPrompt(template, {
    unitTest: true,
    coverage: false,
    eslint: 'disable',
    compile: false,
    username: 'test',
    email: 'test@test.com'
  }).then(({ fileList, files }) => {
    expect(fileList).toEqual([
      '.editorconfig',
      '.gitattributes',
      'LICENSE',
      'README.md',
      'circle.yml',
      'index.js',
      'package.json',
      'test/index.test.js',
      '.gitignore',
    ].sort())

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
    compile: false,
    username: 'test',
    email: 'test@test.com'
  }).then(({ files }) => {
    expect(files['circle.yml'].contents.toString()).toMatch('bash <(curl -s https://codecov.io/bash)')
    expect(files['circle.yml'].contents.toString()).toMatch('yarn test:cov')

    const pkg = JSON.parse(files['package.json'].contents.toString())
    expect(pkg.scripts['test:cov']).toBe('jest --coverage')
  })
})

it('add cli', () => {
  return sao.mockPrompt(template, {
    unitTest: true,
    coverage: true,
    eslint: 'disable',
    compile: false,
    username: 'test',
    email: 'test@test.com',
    cli: true
  }).then(({ files }) => {
    expect(files['cli.js']).toBeDefined()

    const pkg = JSON.parse(files['package.json'].contents.toString())
    expect(pkg.dependencies.yargs).toBeDefined()
  })
})