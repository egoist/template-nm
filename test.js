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
    .then(stream => {
      expect(stream.fileList).toContain('test/index.test.js')

      const pkg = JSON.parse(stream.fileContents('package.json'))
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
    .then(stream => {
      expect(stream.fileContents('circle.yml')).toMatch(
        'bash <(curl -s https://codecov.io/bash)'
      )
      expect(stream.fileContents('circle.yml')).toMatch('npm run test:cov')

      const pkg = JSON.parse(stream.fileContents('package.json'))
      expect(pkg.scripts['test:cov']).toBe('jest --coverage && npm run lint')
    })
})

it('add cli', () => {
  return sao
    .mockPrompt(template, {
      cli: true
    })
    .then(stream => {
      expect(stream.fileList).toContain('cli.js')

      const pkg = JSON.parse(stream.fileContents('package.json'))
      expect(pkg.dependencies).toHaveProperty('yargs')
      expect(pkg.files).toContain('cli.js')
    })
})
