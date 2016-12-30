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
      role: 'git:name'
    },
    email: {
      message: 'What is your GitHub email?',
      role: 'git:email'
    },
    unitTest: {
      message: 'Do you need unit test?',
      type: 'confirm'
    }
  },
  filters: {
    'test.js': 'unitTest'
  },
  post({chalk, isNewFolder, folderName}) {
    console.log(`\n  ${chalk.green('done!')}`)
    if (isNewFolder) {
      console.log(`  cd ${chalk.yellow(folderName)} to get started!\n`)
    } else {
      console.log()
    }
  }
}
