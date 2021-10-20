const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const Generator = require('./generator');

module.exports = async function(name, options) {
  const cwd = process.cwd();
  const destDir = path.join(cwd, name);

  if (fs.existsSync(destDir)) {
    if (options.force) {
      fs.removeSync(destDir);
    } else {
      let {action} = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Cancel',
              value: false
            }, {
              name: 'Overwrite',
              value: 'overwrite'
            }
          ]
        }
      ]);

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        console.log(`\r\nRemoving...`);
        await fs.remove(destDir);
      }
    }
  }

  const { type } = await inquirer.prompt([
    {
      name: 'type',
      type: 'list',
      message: 'Select your project type',
      choices: [
        // {
        //   name: 'Typescript',
        //   value: 1
        // },
        // {
        //   name: 'Redux',
        //   value: 2
        // },
        {
          name: 'Typescript + Redux',
          value: 3
        }
      ]
    }
  ]);

  const generator = new Generator(name, type, destDir);
  generator.create();
};
