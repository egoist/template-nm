const superb = require('superb')
const camelcase = require('camelcase')

module.exports = {
  templateOptions: {
    context: {
      camelcase
    }
  },
  prompts: {
    name: {
      message: 'What is the name of the new project',
      default: ':folderName:'
    },
    description: {
      message: 'How would you describe the new project',
      default: `my ${superb()} project`
    },
    author: {
      message: 'What is your name',
      default: ':gitUser:',
      store: true
    },
    username: {
      message: 'What is your GitHub username',
      default: ':gitUser:',
      store: true
    },
    email: {
      message: 'What is your GitHub email',
      default: ':gitEmail:',
      store: true,
      validate: v => /.+@.+/.test(v)
    },
    website: {
      message: 'What is the url of your website',
      default(answers) {
        return `https://github.com/${answers.username}`
      },
      store: true
    },
    pm: {
      message: 'Choose a package manager',
      choices: ['npm5', 'yarn'],
      type: 'list',
      default: 'npm5'
    },
    travis: {
      message: 'Do you need Travis CI',
      type: 'confirm',
      default: true
    },
    unitTest: {
      message: 'Do you need unit test?',
      type: 'confirm',
      default: false
    },
    coverage: {
      message: 'Do you want to add test coverage support?',
      type: 'confirm',
      default: false,
      when: answers => answers.unitTest
    },
    eslint: {
      message: 'Choose an eslint tool',
      type: 'list',
      default: 'xo',
      choices: ['xo', 'standard', 'disable']
    },
    compile: {
      message: 'Do you need to compile ES2015 code?',
      type: 'confirm',
      default: false
    },
    poi: {
      type: 'confirm',
      default: false,
      message: 'Use egoist/poi to run and build example',
      when: answers => answers.compile
    },
    cli: {
      message: 'Do you want to add a CLI?',
      type: 'confirm',
      default: false,
      when: answers => !answers.compile
    },
    twitter: {
      message: 'What is your twitter username?',
      store: true
    },
    donateUrl: {
      message: 'The URL where users can donate to your project',
      store: true,
      default: 'none',
      filter: v => (/^https?:\/\//.test(v) ? v : 'none')
    }
  },
  filters: {
    'test/**': 'unitTest',
    'src/**': 'compile',
    'index.js': '!compile',
    'cli.js': 'cli',
    'circle-npm5.yml': 'pm === "npm5"',
    'circle-yarn.yml': 'pm === "yarn"',
    '.travis.yml': 'travis',
    'example/**': 'poi'
  },
  move: {
    // We keep `.gitignore` as `gitignore` in the project
    // Because when it's published to npm
    // `.gitignore` file will be ignored!
    gitignore: '.gitignore',
    'circle-*.yml': 'circle.yml'
  },
  post(ctx, stream) {
    ctx.gitInit()

    // You can also use `ctx.answers` in SAO^0.21.4
    if (stream.meta.answers.pm === 'yarn') {
      // yarn (or fallbacks to) npm5 (or fallbacks to) npm
      ctx.yarnInstall()
    } else {
      // npm5 (or fallbacks to) yarn (or fallbacks to) npm
      ctx.npmInstall()
    }

    ctx.showTip()
  }
}
