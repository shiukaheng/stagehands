import chalk from "chalk";
import { spawn } from "child_process";
import { getOS } from "./lib";

const os = getOS();
const prebuildScript = os === "win32" ? "prebuild.bat" : "prebuild.sh";
const shellCmd = os === "win32" ? "cmd" : "bash";
const shellArgs = os === "win32" ? ["/c", prebuildScript] : [prebuildScript];

console.log(chalk.blue.bold(`Running prebuild script: ${prebuildScript}...`));

const prebuild = spawn(shellCmd, shellArgs, {
  stdio: "inherit",
  cwd: "./ros",
});

prebuild.on("exit", (code) => {
  if (code !== 0 && code !== null) {
    console.log(chalk.red.bold(`Prebuild failed with code ${code}`));
    process.exit(code);
  } else {
    console.log(chalk.green.bold("Prebuild completed successfully!"));
  }
});