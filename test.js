const sao = require('sao')

const template = {
  fromPath: process.cwd()
}

it('use defaults', () => {
  return sao.mockPrompt(template, {}).then(({ fileList }) => {
    expect(fileList).toEqual([
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      'LICENSE',
      'README.md',
      'circle.yml',
      'index.js',
      'package.json'
    ])
  })
})

it('add unit test', () => {
  return sao
    .mockPrompt(template, {
      unitTest: true
    })
    .then(({ fileList, files }) => {
      expect(fileList).toContain('test/index.test.js')

      const pkg = JSON.parse(files['package.json'].contents.toString())
      expect(pkg.scripts.test).toBe('jest && npm run lint')
      expect(pkg.devDependencies).toHaveProperty('jest-cli')
    })
})

it('add coverage', () => {
  return sao
    .mockPrompt(template, {
      unitTest: true,
      coverage: true
    })
    .then(({ files }) => {
      expect(files['circle.yml'].contents.toString()).toMatch(
        'bash <(curl -s https://codecov.io/bash)'
      )
      expect(files['circle.yml'].contents.toString()).toMatch('yarn test:cov')

      const pkg = JSON.parse(files['package.json'].contents.toString())
      expect(pkg.scripts['test:cov']).toBe('jest --coverage && npm run lint')
    })
})

it('add cli', () => {
  return sao
    .mockPrompt(template, {
      cli: true
    })
    .then(({ fileList, files }) => {
      expect(fileList).toContain('cli.js')

      const pkg = JSON.parse(files['package.json'].contents.toString())
      expect(pkg.dependencies).toHaveProperty('yargs')
      expect(pkg.files).toContain('cli.js')
    })
})
