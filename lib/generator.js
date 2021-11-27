const { getBranches } = require('./http');
const path = require('path');
const ora = require('ora');
const util = require('util');
const chalk = require('chalk');
const downloadGitRepo = require('download-git-repo');
const rename = require('./rename')

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();

  try {
    const result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    spinner.fail('Request failed, refetch ...')
  }
}

class Generator {
  constructor (name, type, targetDir){
    this.name = name; // 项目名称
    this.type = type; // 项目类型
    this.targetDir = targetDir; // 项目目录
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async getRepo() {
    // 1）从远程拉取模板数据
    const branches = await wrapLoading(getBranches, 'Waiting fetch template...');

    switch(this.type) {
      case 1:
        const repo = branches.find(b => b.name === 'template_typescript_redux');
        return repo.name;
      default:
        return null
    }
  }

  async download(branch){
    const requestUrl = `neilning-xc/react-ts-redux-template${branch ? '#'+branch : ''}`;
    await wrapLoading(
      this.downloadGitRepo,
      'Waiting download template',
      requestUrl,
      path.resolve(process.cwd(), this.targetDir)
    );
  }

  async create(){
    const branch = await this.getRepo();
    await this.download(branch);

    // Rename project
    rename(this.targetDir, this.name);

    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log('\r\ncopy env file:');
    console.log(`  ${chalk.cyan('cp .env.example .env')}`);
    console.log('\r\nInstall dependencies:');
    console.log(`  ${chalk.cyan('yarn')}`);
    console.log('\r\nStart development:');
    console.log(`  ${chalk.cyan('yarn start')}`);
  }
}

module.exports = Generator;
