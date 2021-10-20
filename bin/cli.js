#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');

program.command('create <app-name>')
  .description('Create a new project')
  .option('-f --force', 'Overwrite the existing dir')
  .action((name, options) => {
    require('../lib/create')(name, options);
  });

program.command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    console.log(value, options)
  });

program.on('--help', () => {
  console.log('\r\n' + figlet.textSync('React Skeleton'));
  console.log(`\r\nRun ${chalk.cyan(`rs <command> --help`)} for detailed usage of given command.\r\n`);
});

program.version(`v${require('../package.json').version}`)
  .usage('<command> [option]');

program.parse(process.argv);
