import { execSync } from "child_process";

// Function for checking whether docker is installed
export function dockerInstalled(): boolean {
    try {
        execSync('docker -v', { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

// Function for getting OS
export function getOS() {
    return process.platform;
}

// Function for checking if wsl is installed
export function wslInstalled(): boolean {
    try {
        execSync('wsl -l', { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

// Function for checking if wsl is wsl1 or wsl2
export function wslVersion(): '1' | '2' | null {
    // Check if wsl is installed
    if (!wslInstalled()) {
        return null;
    } else {
        // Check if wsl is wsl1 or wsl2
        try {
            execSync('wsl -l -v', { stdio: 'ignore' });
            return '2';
        } catch (e) {
            return '1';
        }
    }
}

// Check if WSLg is installed
export function wslgInstalled(): boolean {
    try {
        execSync('wslg echo', { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

// Check if VCXSRV is installed by checking C:\Program Files\VcXsrv\vcxsrv.exe
export function vcxsrvInstalled(): boolean {
    try {
        execSync('C:\\Program Files\\VcXsrv\\vcxsrv.exe -version', { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

// Launch VcXsrv with clipboard support, multiwindow, nowinkill, and no access control
export function launchVcxsrv() {
    try {
        execSync('C:\\Program Files\\VcXsrv\\vcxsrv.exe :0 -clipboard -multiwindow -nowinkill -ac -silent', { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

export function getWindowsXServer(): 'vcxsrv' | 'wslg' | null {
    if (wslgInstalled()) {
        return 'wslg';
    } else if (vcxsrvInstalled()) {
        return 'vcxsrv';
    } else {
        return null;
    }
}