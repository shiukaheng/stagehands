import chalk from "chalk";
import { spawn } from "child_process";
import { getOS } from "./lib";

const os = getOS();
const updateScript = os === "win32" ? "update_prod.bat" : "update_prod.sh";
const shellCmd = os === "win32" ? "cmd" : "bash";
const shellArgs = os === "win32" ? ["/c", updateScript] : [updateScript];

console.log(chalk.blue.bold(`Updating production environment with script: ${updateScript}...`));

const update = spawn(shellCmd, shellArgs, {
  stdio: "inherit",
  cwd: "./ros",
});

update.on("exit", (code) => {
  if (code !== 0 && code !== null) {
    console.log(chalk.red.bold(`Update failed with code ${code}`));
    process.exit(code);
  } else {
    console.log(chalk.green.bold("Update completed successfully!"));
    process.exit(0);
  }
});
