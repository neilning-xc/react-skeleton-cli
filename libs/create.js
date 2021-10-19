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

  const generator = new Generator(name, destDir);
  generator.create();
};
