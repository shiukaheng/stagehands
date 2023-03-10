"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const child_process_1 = require("child_process");
const lib_1 = require("./lib");
const art = require('ascii-art');
// Print the ascii art
art.font('StageHands', 'Doom', function (err, rendered) {
    console.log(chalk.magentaBright.bold(rendered));
    console.log(chalk.cyanBright.bold("Checking system requirements..."));
    const sys = {
        hasDocker: (0, lib_1.dockerInstalled)(),
        os: (0, lib_1.getOS)(),
        wsl: (0, lib_1.wslVersion)(),
        winX: (0, lib_1.getWindowsXServer)()
    };
    console.log(chalk.cyanBright(`Detected OS: ${sys.os}`));
    console.log(chalk.cyanBright(`Docker installed: ${sys.hasDocker}`));
    if (sys.os == "win32") {
        console.log(chalk.cyanBright(`WSL version: ${sys.wsl}`));
        console.log(chalk.cyanBright(`Windows X Server: ${sys.winX}`));
    }
    const dockerSupported = sys.hasDocker;
    const osSupported = ["win32", "linux", "darwin"].includes(sys.os);
    const wslSupported = !(sys.os == "win32" && sys.wsl == null);
    if (dockerSupported && osSupported && wslSupported) {
        console.log(chalk.greenBright.bold("System requirements met!"));
    }
    else {
        console.log(chalk.redBright.bold("System requirements not met!"));
        if (!dockerSupported) {
            console.log(chalk.redBright("Docker not installed, or not in PATH"));
        }
        if (!osSupported) {
            console.log(chalk.redBright("Operating system not supported"));
        }
        if (!wslSupported) {
            console.log(chalk.redBright("WSL not installed!"));
        }
        // Exit the program
        process.exit(1);
    }
    if (sys.os === "win32" && sys.winX === null) {
        console.log(chalk.redBright("Warning: Running StageHands on Windows without a X Server detected. GUI applications will not work!"));
    }
    if (sys.os === "win32" && sys.winX === "vcxsrv") {
        console.log(chalk.greenBright("Starting VcXsrv..."));
        (0, lib_1.launchVcxsrv)();
    }
    // If windows and wslg, in workdir ./ros, run ./launch_wslg.bat, pipe output to console
    let launch;
    if (sys.os === "win32" && sys.winX === "wslg") {
        console.log(chalk.cyanBright("Launching in WSLg mode..."));
        // Run the windows batch file ./ros/launch_wslg.bat using cmd /c
        launch = (0, child_process_1.spawn)('cmd', ['/c', 'launch_wslg.bat'], { stdio: 'inherit', cwd: './ros' });
    }
    else if (sys.os === "win32") {
        console.log(chalk.cyanBright("Launching in WSL mode..."));
        // Similar but launch_wsl.bat
        launch = (0, child_process_1.spawn)('cmd', ['/c', 'launch_wsl.bat'], { stdio: 'inherit', cwd: './ros' });
    }
    else if (sys.os === "linux") {
        // Similar but using ./ros/launch_linux.sh and the default shell
        console.log(chalk.cyanBright("Launching in Linux mode..."));
        launch = (0, child_process_1.spawn)('bash', ['./launch_linux.sh'], { stdio: 'inherit', cwd: './ros' });
    }
    else if (sys.os === "darwin") {
        console.log(chalk.cyanBright("Launching in macOS mode..."));
        console.log(chalk.redBright("Warning: macOS does not provide OpenGL, so some GUI applications like Gazebo may not work!"));
        launch = (0, child_process_1.spawn)('bash', ['./launch_macos.sh'], { stdio: 'inherit', cwd: './ros' });
    }
    else {
        console.log(chalk.redBright("Unknown operating system!"));
        process.exit(1);
    }
    launch.stdout?.pipe(process.stdout);
    launch.on('exit', (code) => {
        // If not 0, exit with code
        if (code !== 0 && code !== null) {
            console.log(chalk.redBright.bold(`Docker-compose exited with code ${code}`));
            process.exit(code);
        }
        else {
            console.log(chalk.greenBright.bold("Docker-compose exited successfully!"));
            console.log(chalk.greenBright("You can now attach to the StageHands container via the Dev Container extension to develop."));
            process.exit(0);
        }
    });
});
