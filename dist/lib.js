"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWindowsXServer = exports.launchVcxsrv = exports.vcxsrvInstalled = exports.wslgInstalled = exports.wslVersion = exports.wslInstalled = exports.getOS = exports.dockerInstalled = void 0;
const child_process_1 = require("child_process");
// Function for checking whether docker is installed
function dockerInstalled() {
    try {
        (0, child_process_1.execSync)('docker -v', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.dockerInstalled = dockerInstalled;
// Function for getting OS
function getOS() {
    return process.platform;
}
exports.getOS = getOS;
// Function for checking if wsl is installed
function wslInstalled() {
    try {
        (0, child_process_1.execSync)('wsl -l', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.wslInstalled = wslInstalled;
// Function for checking if wsl is wsl1 or wsl2
function wslVersion() {
    // Check if wsl is installed
    if (!wslInstalled()) {
        return null;
    }
    else {
        // Check if wsl is wsl1 or wsl2
        try {
            (0, child_process_1.execSync)('wsl -l -v', { stdio: 'ignore' });
            return '2';
        }
        catch (e) {
            return '1';
        }
    }
}
exports.wslVersion = wslVersion;
// Check if WSLg is installed
function wslgInstalled() {
    try {
        (0, child_process_1.execSync)('wslg echo', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.wslgInstalled = wslgInstalled;
// Check if VCXSRV is installed by checking C:\Program Files\VcXsrv\vcxsrv.exe
function vcxsrvInstalled() {
    try {
        (0, child_process_1.execSync)('C:\\Program Files\\VcXsrv\\vcxsrv.exe -version', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.vcxsrvInstalled = vcxsrvInstalled;
// Launch VcXsrv with clipboard support, multiwindow, nowinkill, and no access control
function launchVcxsrv() {
    try {
        (0, child_process_1.execSync)('C:\\Program Files\\VcXsrv\\vcxsrv.exe :0 -clipboard -multiwindow -nowinkill -ac -silent', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.launchVcxsrv = launchVcxsrv;
function getWindowsXServer() {
    if (wslgInstalled()) {
        return 'wslg';
    }
    else if (vcxsrvInstalled()) {
        return 'vcxsrv';
    }
    else {
        return null;
    }
}
exports.getWindowsXServer = getWindowsXServer;
