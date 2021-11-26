const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

function rename(targetDir, projectName) {
  const Project$name = projectName.replace('-', ' ').replace(/^\S/, s => s.toUpperCase());
  const project_name = projectName.toLowerCase().replace('-', '_');
  const project__name = projectName.toLowerCase();

  const files = fs.readdirSync(targetDir);
  for (const file of files) {
    const stat = fs.lstatSync(path.join(targetDir, file));
    if (stat.isDirectory()) {
      rename(path.join(targetDir, file), projectName);
    } else {
      ejs
        .renderFile(path.join(targetDir, file), {
          Project$name: Project$name,
          project_name: project_name,
          project__name: project__name,
        })
        .then((data) => {
          fs.writeFileSync(path.join(targetDir, file), data);
        });
    }
  }
}

module.exports = rename;
