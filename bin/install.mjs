#!/usr/bin/env node
import { promisify } from "util";
import cp from "child_process";
import path from "path";
import fs, { existsSync, mkdirSync } from "fs";
import ora from "ora";

// convert libs to promises
const exec = promisify(cp.exec);
const rm = promisify(fs.rm);

const repoUser = 'https://github.com/codingnninja';
const projectName = process.argv[2];
const projectType = process.argv[3];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);

const templates = {
  '--typescript': `${repoUser}/create-render-app-ts.git`,
  '--music-player': `${repoUser}/create-render-app.git`,
  '--vanilla': `${repoUser}/create-render-app-js.git`,
  '--component': `${repoUser}/create-render-app.git`
};

const git_repo = projectType ? templates[projectType] : templates['--music-player'] ;

if (process.argv.length < 3) {
  console.log("You have to provide a name for your app.");
  console.log("    For example:");
  console.log("        npx create-render-app my-app-name");
  process.exit(1);
}

if(process.argv[2].startsWith('--') || (process.argv[3] && !process.argv[3].startsWith('--'))){
  console.log("A wrong command executed.");
  console.log("    Below is a valid command:");
  console.log("         npx create-render-app my-app-name --music-player");
  process.exit(1);
}

if (fs.existsSync(projectPath)) {
  console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
  process.exit(1);
}
else {
  fs.mkdirSync(projectPath);
}

try {
  const gitSpinner = ora("Downloading files...").start();
  // clone the repo into the project folder -> creates the new boilerplate
  if(projectType === '--component'){
    await exec(`git archive --remote=${templates[projectType]} branch:bin/templates/${projectName}.js | tar -x -C ${path.join(currentPath, '/src/components')}`);
  } else {
    await exec(`git clone --depth 1 ${git_repo} ${projectPath} --quiet`);
  }
  
  gitSpinner.succeed();

  const cleanSpinner = ora("Removing useless files").start();
  // remove my git history
  const rmGit = rm(path.join(projectPath, ".git"), { recursive: true, force: true });
  // remove the installation file
  const rmBin = rm(path.join(projectPath, "bin"), { recursive: true, force: true });
  await Promise.all([rmGit, rmBin]);

  process.chdir(projectPath);
  // remove the packages needed for cli
  await exec("npm uninstall ora cli-spinners");
  cleanSpinner.succeed();

  const npmSpinner = ora("Installing dependencies...").start();
  await exec("npm install");
  npmSpinner.succeed();

  console.log("The installation is done!");
  console.log("You can now run your app with:");
  console.log(`    cd ${projectName}`);
  console.log(`    npm run dev`);

} catch (error) {
  // clean up in case of error, so the user does not have to do it manually
  fs.rmSync(projectPath, { recursive: true, force: true });
  console.log(error);
}

