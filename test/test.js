import test from 'ava'
import sao from 'sao'

const template = {
  fromPath: process.cwd()
}

const getPkg = (pkg, fields) => {
  pkg = JSON.parse(pkg)
  return fields.reduce((res, curr) => {
    res[curr] = pkg[curr]
    return res
  }, {})
}

test('use defaults', async t => {
  const { fileList } = await sao.mockPrompt(template, {})
  t.snapshot(fileList)
})

test('npm5: add unit test', async t => {
  const stream = await sao.mockPrompt(template, {
    unitTest: true
  })

  t.snapshot(stream.fileList)
  t.snapshot(
    getPkg(stream.fileContents('package.json'), ['scripts', 'devDependencies'])
  )
})

test('npm5: add coverage', async t => {
  const stream = await sao.mockPrompt(template, {
    unitTest: true,
    coverage: true
  })

  t.snapshot(stream.fileList)
  t.snapshot(stream.fileContents('circle.yml'))
})

test('add cli', async t => {
  const stream = await sao.mockPrompt(template, {
    cli: true
  })
  t.snapshot(stream.fileList)
  t.snapshot(
    getPkg(stream.fileContents('package.json'), ['bin', 'dependencies'])
  )
})

test('yarn: unit test', async t => {
  const stream = await sao.mockPrompt(template, {
    unitTest: true,
    pm: 'yarn'
  })
  const config = stream.fileContents('circle.yml')
  t.snapshot(config)
  t.snapshot(stream.fileList)
})

test('support poi', async t => {
  const stream = await sao.mockPrompt(template, {
    compile: true,
    poi: true
  })
  t.snapshot(stream.fileList)
  t.snapshot(
    getPkg(stream.fileContents('package.json'), [
      'scripts',
      'poi',
      'devDependencies'
    ])
  )
})
