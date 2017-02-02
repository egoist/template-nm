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
      message: 'What is the name of the new project?',
      role: 'folder:name'
    },
    description: {
      message: 'How would you descripe the new project?',
      default: `my ${superb()} project`
    },
    username: {
      message: 'What is your GitHub username?',
      role: 'git:name',
      store: true
    },
    email: {
      message: 'What is your GitHub email?',
      role: 'git:email',
      store: true
    },
    website: {
      message: 'What is the url of your website?',
      default(answers) {
        return `https://github.com/${answers.username}`
      },
      store: true
    },
    unitTest: {
      message: 'Do you need unit test?',
      type: 'confirm'
    },
    eslint: {
      message: 'Choose a eslint tool',
      type: 'list',
      choices: [
        'xo',
        'standard',
        'disable'
      ]
    },
    twitter: {
      message: 'What is your twitter username?',
      store: true
    }
  },
  filters: {
    '__test__/**': 'unitTest'
  },
  post({chalk, isNewFolder, folderName, log, install, init}) {
    install()
    init()
    log.success('Done, let the hacking begin!')
    if (isNewFolder) {
      console.log(`  cd ${chalk.yellow(folderName)} to get started!\n`)
    }
  }
}
