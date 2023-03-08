/// <reference types="node" />
export declare function dockerInstalled(): boolean;
export declare function getOS(): NodeJS.Platform;
export declare function wslInstalled(): boolean;
export declare function wslVersion(): '1' | '2' | null;
export declare function wslgInstalled(): boolean;
export declare function vcxsrvInstalled(): boolean;
export declare function launchVcxsrv(): boolean;
export declare function getWindowsXServer(): 'vcxsrv' | 'wslg' | null;
